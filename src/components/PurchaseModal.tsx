'use client';
import { useCartStore } from '@/store/cartStore';
import { useCommonStore } from '@/store/commonStore';
import axios from 'axios';
import { MessageProps } from '@/types';
import { Modal } from './common';
import { InputElement } from './forms/InputElement';
import { Button } from './Button';
import { useState } from 'react';
import { MessageToastCard } from './MessageToastCard';

export const PurchaseModal = ({
  isOpen,
  onClose,
  userEmail,
  title,
  amount,
  handleNext
}: {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  amount?: string;
  title?: string;
  handleNext?: () => void;
}) => {
  const [email, setEmail] = useState(userEmail || '');
  const [url, setUrl] = useState('');
  const [ticketPin, setTicketPin] = useState('');
  const [showTicketInput, setShowTicketInput] = useState(false);
  const [showOtherButton, setShowOtherButton] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [loading, setLoading] = useState('');
  const [showCardAndWallet, setShowCardAndWallet] = useState(false);
  const { setRefreshBalance, refreshBalance } = useCommonStore((state) => state);
  const { emptyCart } = useCartStore(state => state);
  const [message, setMessage] = useState<MessageProps | null>({ type: '', text: '' });

  const updateUrl = (url: string) => {
    setUrl(url);
    setShowButtons(false);
    setShowTicketInput(false);
  }

  const handleOther = () => {
    setShowTicketInput(false);
    setShowCardAndWallet(true);
    setTicketPin('');
    setShowOtherButton(false);
  }

  const handleTicketPayment = async () => {
    if (!ticketPin) {
      setShowTicketInput(true);
      setShowCardAndWallet(false);
      setShowOtherButton(true);
      return;
    }
    setLoading('e-ticket');
    try {
      const response = await axios.post('/api/purchase', { pin: ticketPin, email });
      setMessage({ type: response.data.success ? 'success' : 'failed', text: response.data.message });
      if (response.data.success) {
        emptyCart()
        updateUrl(response?.data?.url);
        setTimeout(() => {
          handleNext?.()
        }, 5000);
      }
    } catch (error) {
      // @ts-expect-error null
      setMessage({ type: 'failed', text: error?.message || 'An error occurred during ticket payment.' });
    } finally {
      setLoading('');
    }
  };

  const handleWalletPayment = async () => {
    setLoading('wallet');
    try {
      const response = await axios.post('/api/purchase', { wallet: true, email });
      setMessage({ type: response.data.success ? 'success' : 'failed', text: response.data.message });
      if (response.data.success) {
        emptyCart()
        updateUrl(response?.data?.url);
        setRefreshBalance(!refreshBalance);
        setTimeout(() => {
          handleNext?.();
        }, 5000);
      }
    } catch (error) {
      // @ts-expect-error null
      setMessage({ type: 'failed', text: error?.message || 'An error occurred during wallet payment.' });
    } finally {
      setLoading('');
    }
  };

  const handlePayWithCard = () => {
    if (!email) {
      setMessage({ type: "failed", text: "Email is required." });
      return;
    }
    setLoading('card');

    // @ts-expect-error null
    const handler = window.PaystackPop.setup({
      key: 'pk_live_d402908517e7c9dd173cc31624f4ac57212511ee',
      email,
      amount: Number(amount) * 100,
      currency: "NGN",
      subaccount: "ACCT_mnlhs0mxkq2msad",
      transaction_charge: 0,
      callback: async (response: { reference: string }) => {
        try {
          const res = await axios.post("/api/purchase", {
            ref: response.reference,
            email,
          });

          if (res.data.message) {
            setMessage({
              type: res.data.success ? "success" : "failed",
              text: res.data.message,
            });
            updateUrl(res?.data?.url);
            if (res.data.success) {
              if(res.data?.url) {
                window.location.href = res.data.url;
              } else {
                handleNext?.();
              }
            }
          }
        } catch (error) {
          // @ts-expect-error null
          setMessage({ type: "failed", text: error?.message || "An error occurred during payment." });
        } finally {
          setLoading('');
        }
      },
      onClose: () => {
        setLoading('');
      },
    });

    handler.openIframe();
  };

  return (
    isOpen &&
    <>
      <Modal
        onClose={onClose}
        fullScreenMobile
        title={title || 'Checkout'}
      >
        <form className="flex flex-col gap-[15px] md:px-6 pt-2 px-4 pb-4">
          {message?.text && (
            <MessageToastCard 
              text={message?.text}
              type={message?.type}
              handleClose={() => setMessage(null)}
            />
          )}

        {
          showButtons &&
          <>
            <InputElement 
              value={email}
              name='email'
              label='Email Address:'
              type='email'
              onChangeEvent={(e) => setEmail(e.target.value)}
              placeholder="phillip@example.com"
              required
            />

            {showTicketInput && (
              <InputElement 
                value={ticketPin}
                name='ticketPin'
                label='Ticket PIN'
                type='text'
                onChangeEvent={(e) => setTicketPin(e.target.value)}
                placeholder="01234567"
                required
              />
            )}
          </>
        }

          <div className="flex flex-wrap gap-2 justify-end pt-4">
            {
              url && 
              <Button
                id="download"
                href={url}
                download
                label='Download'
              />
            }

            {
              showButtons && 
              <>
                {showCardAndWallet && email && (
                  <Button
                    type="button"
                    onClick={handleWalletPayment}
                    disabled={loading == 'wallet'}
                    label='Pay from Wallet'
                    id='paywallet'
                    loading={loading == 'wallet'}
                  />
                )}

                <Button
                  type="button"
                  onClick={handleTicketPayment}
                  disabled={loading == 'e-ticket'}
                  label='Pay With E-Ticket'
                  id='payticket'
                  loading={loading == 'e-ticket'}
                />

                {
                  showCardAndWallet && 
                  <Button
                    type="button"
                    onClick={handlePayWithCard}
                    disabled={loading == 'card'}
                    label='Pay With Card'
                    id='paycard'
                    loading={loading == 'card'}
                  />
                }

                {
                  showOtherButton && 
                  <Button
                    type="button"
                    onClick={handleOther}
                    label='Other Payment Methods'
                    id='others'
                  />
                }
              </>
            }
          </div>
        </form>
      </Modal>
    </>
  );
}

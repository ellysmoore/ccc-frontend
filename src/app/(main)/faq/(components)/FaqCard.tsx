import { BiChevronDown } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

function FaqsCard({
  id,
  title,
  body,
  clickedId,
  showDetails
}: FaqsCardProps) {
  const variants = {
    initial: {
      height: 0,
      opacity: 0,
    },
    show: {
      height: 'auto',
      opacity: 1,
      transition: {
        default: { duraion: 0.2 },
      },
    },
    hide: {
      height: 0,
      opacity: 0,
      transition: {
        opacity: { duration: 0.2 },
      },
    },
  };

  const open = clickedId == id;

  return (
    <section 
      onClick={() => showDetails(open ? '' : id)}
      className={`p-4 md:p-4 bg-white cursor-pointer flex flex-col gap-[10px] md:gap-[20px] border border-[#E4E7EC] rounded-[10px]`}
    >
      <div className='w-full flex items-center justify-between gap-[12px] md:gap-[16px] '>
        <div className='text-f16 md:text-f18'>
          {title}
        </div>

        <div className={`h-[30px] min-w-[30px] md:h-[32px] md:min-w-[32px] border bg-white 
          border-[#E4E7EC] rounded-full flex justify-center items-center`}
        >
          <BiChevronDown 
            size={23} 
            className={`text-[#666D80] transition-all ${open && 'rotate-180'}`} 
          />
        </div>
      </div>

      {
        open &&
        <motion.div 
          variants={variants}
          initial='initial'
          animate='show'
          transition={{
            default: { ease: 'linear' },
          }}
          exit='hide'
          className='text-gray-400 text-f15 md:text-f16 w-full'
        >
          {body}
        </motion.div>
      }
    </section>
  );
}

export interface FaqsCardProps {
  id: string;
  title: string;
  body: ReactNode;
  clickedId: string;
  showDetails: (value: string) => void;
}

export default FaqsCard;
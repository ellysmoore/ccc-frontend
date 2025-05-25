'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns'
import io from 'socket.io-client'
import { FaDownload, FaPodcast, FaTicketAlt, FaUsers } from 'react-icons/fa'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale)

export default function AdminDashboardPage() {
  const [usersCount, setUsersCount] = useState('NA')
  const [mediaCount, setMediaCount] = useState('NA')
  const [downloadsCount, setDownloadsCount] = useState('NA')
  const [ticketsCount, setTicketsCount] = useState('NA')
  interface Download {
    topic: string;
    downloads: number;
  }

  const [downloads, setDownloads] = useState<Download[]>([]);

  const DASHBOARD_STATS = [
    { title: 'Total Users', value: usersCount, icon: <FaUsers className='text-2xl text-gray-300' />, href: '/admin/users' },
    { title: 'Total Messages', value: mediaCount, icon: <FaPodcast className='text-2xl text-gray-300' />, href: '/admin/messages' },
    { title: 'Total Downloads', value: downloadsCount, icon: <FaDownload className='text-2xl text-gray-300' /> },
    { title: 'Total Tickets', value: ticketsCount, icon: <FaTicketAlt className='text-2xl text-gray-300' />, href: '/admin/batches' },
  ];

  interface ChartDataset {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    tension?: number;
    pointRadius?: number;
  }

  interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
  }

  const [downloadsData, setDownloadsData] = useState<ChartData>({ labels: [], datasets: [{ label: 'Downloads', data: [] }] })
  const [registrationsData, setRegistrationsData] = useState<ChartData>({ labels: [], datasets: [{ label: 'Registrations', data: [] }] })

  useEffect(() => {
    // TODO: CALL API REQUEST HERE
    setDownloads([]);
  }, []);

  useEffect(() => {
    const socket = io('/', { transports: ['websocket'] })
  
    socket.on('usersCount', count => setUsersCount(Number(count).toLocaleString()))
    socket.on('mediaCount', count => setMediaCount(Number(count).toLocaleString()))
    socket.on('downloadsCount', count => setDownloadsCount(Number(count).toLocaleString()))
    socket.on('ticketsCount', count => setTicketsCount(Number(count).toLocaleString()))
  
    socket.on('monthlyDownloads', downloads => {
      downloads = (downloads || []).reverse()
      setDownloadsData({
        labels: downloads.map((d: any) => d.monthyear),
        datasets: [{
          label: 'Downloads',
          data: downloads.map((d: any) => d.downloads),
          borderColor: 'rgba(78, 115, 223, 1)',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          tension: 0.3,
          pointRadius: 3
        }]
      })
    })
  
    socket.on('monthlyRegistrations', registrations => {
      registrations = (registrations || []).reverse()
      setRegistrationsData({
        labels: registrations.map((d: any) => d.monthyear),
        datasets: [{
          label: 'Registrations',
          data: registrations.map((d: any) => d.users),
          borderColor: 'rgba(78, 115, 223, 1)',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          tension: 0.3,
          pointRadius: 3
        }]
      })
    })
    
    return () => {
      socket.disconnect()
    }
  }, []);

  // data: {
  //   labels: [],
  //   datasets: [{
  //     label,
  //     lineTension: 0.3,
  //     backgroundColor: "rgba(78, 115, 223, 0.05)",
  //     borderColor: "rgba(78, 115, 223, 1)",
  //     pointRadius: 3,
  //     pointBackgroundColor: "rgba(78, 115, 223, 1)",
  //     pointBorderColor: "rgba(78, 115, 223, 1)",
  //     pointHoverRadius: 3,
  //     pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
  //     pointHoverBorderColor: "rgba(78, 115, 223, 1)",
  //     pointHitRadius: 10,
  //     pointBorderWidth: 2,
  //     data: [],
  //   }],
  // },

  const lineChartOptions = { 
    maintainAspectRatio: false,
    layout: { padding: { left: 10, right: 25, top: 25, bottom: 0 } },
    scales: {
      x: {
        type: 'timeseries',
        time: { unit: 'month' },
        grid: { display: false, drawBorder: false },
        ticks: { maxTicksLimit: 12 }
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: (value: any) => Number(value).toLocaleString()
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyColor: "#858796",
        titleMarginBottom: 10,
        titleColor: '#6e707e',
        titleFont: { size: 14 },
        borderColor: '#dddfeb',
        borderWidth: 1,
        padding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index' as const,
        caretPadding: 10,
        // callbacks: {
        //   label: (context) => {
        //     let datasetLabel = context.dataset.label || '';
        //     return datasetLabel + ':' + Number(context.parsed.y).toLocaleString();
        //   }
        // }
      }
    }
  }
  

  return (
    <div className="lg:p-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_STATS?.map(({ title, value, icon, href }) => (
          <div key={title} className="bg-white shadow rounded-xl border-l-4 border-orange-500 p-4">
            <a href={href || '#'} className="flex justify-between items-center">
              <div>
                <div className="text-sm text-orange-500 uppercase font-bold">{title}</div>
                <div className="text-xl font-semibold text-gray-800">{value}</div>
              </div>

              {icon}
            </a>
          </div>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Downloads Overview">
          <Line data={downloadsData} options={lineChartOptions} />
        </ChartCard>
        <ChartCard title="Registrations Overview">
          <Line data={registrationsData} options={lineChartOptions} />
        </ChartCard>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white h-fit rounded-xl shadow p-4">
          <h3 className="text-orange-500 font-semibold mb-4">Top Downloads</h3>
          <div className='w-full h-full rounded-[12px] bg-white border border-[#D9D9D9]'>
              <div className='relative min-h-[120px] !overflow-x-auto w-full'>
                <table className="min-w-max w-full">
                  <thead>
                    <tr className='bg-gray-50 border-b border-[#D9D9D9]'>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[50px] !text-left font-medium text-sm py-[14px] pl-[19px]'>Title</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Downloads</th>
              </tr>
            </thead>
            <tbody>
              {
                downloads?.map((download) => (
                  <tr key={download?.topic}className='border-b border-[#F5F5F5] smooth'
                      >
                        <td className='md:!min-w-0 !min-w-[50px] pl-5 pt-[14px] pb-[13px] text-sm text-dark font-medium'>{download?.topic}</td>
                    <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{download?.downloads}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-orange-500 font-semibold mb-4">Latest Feedbacks</h3>
          <div className="text-gray-500 text-sm">No feedbacks yet.</div>
        </div>
      </div>
    </div>
  )
}

const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-80">
      <h3 className="text-orange-500 font-semibold mb-2">{title}</h3>
      <div className="h-[calc(100%-2rem)]">{children}</div>
    </div>
  )
}

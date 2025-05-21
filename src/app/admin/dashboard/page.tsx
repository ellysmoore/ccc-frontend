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
  const [downloads, setDownloads] = useState([]);

  const DASHBOARD_STATS = [
    { title: 'Total Users', value: usersCount, icon: <FaUsers />, href: '/admin/users' },
    { title: 'Total Messages', value: mediaCount, icon: <FaPodcast />, href: '/admin/messages' },
    { title: 'Total Downloads', value: downloadsCount, icon: <FaDownload /> },
    { title: 'Total Tickets', value: ticketsCount, icon: <FaTicketAlt />, href: '/admin/batches' },
  ];

  const [downloadsData, setDownloadsData] = useState({ labels: [], datasets: [{ label: 'Downloads', data: [] }] })
  const [registrationsData, setRegistrationsData] = useState({ labels: [], datasets: [{ label: 'Registrations', data: [] }] })

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
      xAxes: [{ time: { unit: 'date' }, gridLines: { display: false, drawBorder: false }, ticks: { maxTicksLimit: 12 } }],
      yAxes: [{
        // @ts-expect-error null
        ticks: { maxTicksLimit: 5, padding: 10, callback: (value, index, values) => Number(value).toLocaleString() },
        gridLines: { color: "rgb(234, 236, 244)", zeroLineColor: "rgb(234, 236, 244)", drawBorder: false, borderDash: [2], zeroLineBorderDash: [2] }
      }]
    },
    legend: { display: false },
    tooltips: {
      backgroundColor: "rgb(255,255,255)", bodyFontColor: "#858796",
      titleMarginBottom: 10, titleFontColor: '#6e707e', titleFontSize: 14,
      borderColor: '#dddfeb', borderWidth: 1,
      xPadding: 15, yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      // callbacks: {
      //   label: (tooltipItem, chart) => {
      //     let datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
      //     return datasetLabel + ':' + Number(tooltipItem.yLabel).toLocaleString();
      //   }
      // }
    }
  }
  

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_STATS?.map(({ title, value, icon, href }) => (
          <div key={title} className="bg-white shadow rounded-xl border-l-4 border-blue-500 p-4">
            <a href={href || '#'} className="flex justify-between items-center">
              <div>
                <div className="text-sm text-blue-500 uppercase font-bold">{title}</div>
                <div className="text-xl font-semibold text-gray-800">{value}</div>
              </div>
              <i className={`${icon} text-2xl text-gray-300`}></i>
            </a>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Downloads Overview">
          <Line data={downloadsData} options={lineChartOptions} />
        </ChartCard>
        <ChartCard title="Registrations Overview">
          <Line data={registrationsData} options={lineChartOptions} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-blue-500 font-semibold mb-4">Top Downloads</h3>
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3">Title</th>
                <th className="py-2 px-3">Downloads</th>
              </tr>
            </thead>
            <tbody>
              {
                downloads?.map((download) => (
                  <tr key={download?.topic}>
                    <td className="px-3 py-2">{download?.topic}</td>
                    <td className="px-3 py-2">{download?.downloads}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-blue-500 font-semibold mb-4">Latest Feedbacks</h3>
          <div className="text-gray-500 text-sm">No feedbacks yet.</div>
        </div>
      </div>
    </div>
  )
}

const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-80">
      <h3 className="text-blue-500 font-semibold mb-2">{title}</h3>
      <div className="h-[calc(100%-2rem)]">{children}</div>
    </div>
  )
}

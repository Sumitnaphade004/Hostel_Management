import React, { useState } from 'react';
import { DollarSign, Download, Filter, Search, TrendingUp, TrendingDown, Calendar, CreditCard, Users, FileText, Eye, Printer } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function TransactionView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const {theme, currentTheme} = useTheme();

  const transactions = [
    { id: 'TXN001', date: '2025-01-05', student: 'Sarah Johnson', room: '204-A', type: 'rent', amount: 850, status: 'completed', method: 'card', description: 'Monthly rent - January 2025' },
    { id: 'TXN002', date: '2025-01-05', student: 'Mike Chen', room: '305-B', type: 'maintenance', amount: 50, status: 'completed', method: 'cash', description: 'AC repair charges' },
    { id: 'TXN003', date: '2025-01-04', student: 'Emma Wilson', room: '102-C', type: 'rent', amount: 850, status: 'pending', method: 'upi', description: 'Monthly rent - January 2025' },
    { id: 'TXN004', date: '2025-01-04', student: 'Alex Kumar', room: '408-A', type: 'deposit', amount: 1500, status: 'completed', method: 'bank', description: 'Security deposit' },
    { id: 'TXN005', date: '2025-01-03', student: 'John Smith', room: '206-A', type: 'refund', amount: 1500, status: 'completed', method: 'bank', description: 'Security deposit refund' },
    { id: 'TXN006', date: '2025-01-03', student: 'Lisa Brown', room: '310-B', type: 'electricity', amount: 120, status: 'completed', method: 'card', description: 'Electricity bill - December' },
    { id: 'TXN007', date: '2025-01-02', student: 'David Lee', room: '108-C', type: 'rent', amount: 850, status: 'failed', method: 'card', description: 'Monthly rent - January 2025' },
    { id: 'TXN008', date: '2025-01-02', student: 'Rachel Green', room: '501-A', type: 'laundry', amount: 30, status: 'completed', method: 'cash', description: 'Laundry service' },
    { id: 'TXN009', date: '2025-01-01', student: 'Tom Harris', room: '203-B', type: 'rent', amount: 850, status: 'completed', method: 'upi', description: 'Monthly rent - January 2025' },
    { id: 'TXN010', date: '2025-01-01', student: 'Nina Patel', room: '405-C', type: 'food', amount: 250, status: 'completed', method: 'card', description: 'Mess charges - January' },
  ];

  const summary = {
    totalRevenue: 42850,
    totalTransactions: 284,
    pendingAmount: 3420,
    completedToday: 12
  };

  const getTypeStyle = (type) => {
    const styles = {
      rent: { bg: currentTheme === "light" ? 'rgba(31, 111, 235, 0.1)' : 'rgba(13, 110, 253, 0.1)', color: theme.btnPrimary },
      deposit: { bg: currentTheme === "light" ? 'rgba(46, 160, 67, 0.1)' : 'rgba(25, 135, 84, 0.1)', color: theme.success },
      refund: { bg: currentTheme === "light" ? 'rgba(218, 54, 51, 0.1)' : 'rgba(220, 53, 69, 0.1)', color: theme.danger },
      maintenance: { bg: currentTheme === "light" ? 'rgba(210, 153, 34, 0.1)' : 'rgba(255, 193, 7, 0.1)', color: theme.warning },
      electricity: { bg: currentTheme === "light" ? 'rgba(210, 153, 34, 0.1)' : 'rgba(255, 193, 7, 0.1)', color: theme.warning },
      laundry: { bg: currentTheme === "light" ? 'rgba(31, 111, 235, 0.15)' : 'rgba(102, 16, 242, 0.1)', color: '#6610f2' },
      food: { bg: currentTheme === "light" ? 'rgba(219, 39, 119, 0.1)' : 'rgba(214, 51, 132, 0.1)', color: '#d63384' }
    };
    return styles[type] || { bg: theme.bgLight, color: theme.textPrimary };
  };

  const getStatusStyle = (status) => {
    const styles = {
      completed: { bg: currentTheme === "light" ? 'rgba(46, 160, 67, 0.1)' : 'rgba(25, 135, 84, 0.1)', color: theme.success },
      pending: { bg: currentTheme === "light" ? 'rgba(210, 153, 34, 0.1)' : 'rgba(255, 193, 7, 0.1)', color: theme.warning },
      failed: { bg: currentTheme === "light" ? 'rgba(218, 54, 51, 0.1)' : 'rgba(220, 53, 69, 0.1)', color: theme.danger }
    };
    return styles[status] || { bg: theme.bgLight, color: theme.textPrimary };
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          txn.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    const matchesType = filterType === 'all' || txn.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bgSecondary }}>
      {/* Header */}
      <header style={{ backgroundColor: theme.topbarBg, borderBottom: `1px solid ${theme.topbarBorder}` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.textPrimary, margin: 0 }}>Transaction Management</h1>
              <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginTop: '0.25rem' }}>Track and manage all hostel transactions</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: theme.textPrimary,
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}>
                <Printer style={{ display: 'inline', width: '1rem', height: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Print Report
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#ffffff',
                backgroundColor: theme.btnPrimary,
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}>
                <Download style={{ display: 'inline', width: '1rem', height: '1rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Filters and Search */}
        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: '0.75rem',
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.border}`,
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: theme.textMuted }} />
              <input
                type="text"
                placeholder="Search by ID, student, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '2.5rem',
                  paddingRight: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  backgroundColor: theme.inputBg,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: '0.5rem',
                  color: theme.inputText,
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: '0.5rem',
                color: theme.inputText,
                fontSize: '0.875rem'
              }}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: '0.5rem',
                color: theme.inputText,
                fontSize: '0.875rem'
              }}
            >
              <option value="all">All Types</option>
              <option value="rent">Rent</option>
              <option value="deposit">Deposit</option>
              <option value="refund">Refund</option>
              <option value="maintenance">Maintenance</option>
              <option value="electricity">Electricity</option>
              <option value="laundry">Laundry</option>
              <option value="food">Food</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: '0.5rem',
                color: theme.inputText,
                fontSize: '0.875rem'
              }}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div style={{
          backgroundColor: theme.cardBg,
          borderRadius: '0.75rem',
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: theme.bgLight, borderBottom: `1px solid ${theme.border}` }}>
                <tr>
                  {['Transaction ID', 'Date', 'Student', 'Room', 'Type', 'Amount', 'Method', 'Status', 'Actions'].map((header) => (
                    <th key={header} style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: theme.textSecondary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ borderTop: `1px solid ${theme.border}` }}>
                {filteredTransactions.map((txn, idx) => {
                  const typeStyle = getTypeStyle(txn.type);
                  const statusStyle = getStatusStyle(txn.status);
                  
                  return (
                    <tr key={txn.id} style={{
                      borderBottom: idx < filteredTransactions.length - 1 ? `1px solid ${theme.border}` : 'none',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.bgLight}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: theme.textPrimary }}>{txn.id}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '0.875rem', color: theme.textSecondary }}>{txn.date}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            width: '2rem',
                            height: '2rem',
                            backgroundColor: currentTheme === "light" ? 'rgba(31, 111, 235, 0.1)' : 'rgba(13, 110, 253, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '0.75rem'
                          }}>
                            <Users style={{ width: '1rem', height: '1rem', color: theme.btnPrimary }} />
                          </div>
                          <span style={{ fontSize: '0.875rem', fontWeight: '500', color: theme.textPrimary }}>{txn.student}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '0.875rem', color: theme.textSecondary }}>{txn.room}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          borderRadius: '9999px',
                          backgroundColor: typeStyle.bg,
                          color: typeStyle.color
                        }}>
                          {txn.type}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: txn.type === 'refund' ? theme.danger : theme.success
                        }}>
                          {txn.type === 'refund' ? '-' : '+'}${txn.amount}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '0.875rem', color: theme.textSecondary, textTransform: 'capitalize' }}>{txn.method}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          borderRadius: '9999px',
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color
                        }}>
                          {txn.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                        <button style={{ background: 'none', border: 'none', color: theme.btnPrimary, cursor: 'pointer', marginRight: '0.75rem' }}>
                          <Eye style={{ width: '1rem', height: '1rem' }} />
                        </button>
                        <button style={{ background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer' }}>
                          <Download style={{ width: '1rem', height: '1rem' }} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{
            backgroundColor: theme.bgLight,
            padding: '1rem 1.5rem',
            borderTop: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: theme.textPrimary,
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}>
                Previous
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#ffffff',
                backgroundColor: theme.btnPrimary,
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}>
                1
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: theme.textPrimary,
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}>
                2
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: theme.textPrimary,
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
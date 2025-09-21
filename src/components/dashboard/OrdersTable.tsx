import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Box,
  TextField,
  IconButton,
  Avatar,
  TablePagination,
  Menu,
  MenuItem,
  InputAdornment,
  Toolbar,
  TableSortLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { formatTableDate, getDateSortValue } from '../../utils/dateFormatter';

// Mock data types
interface OrderData {
  id: string;
  orderId: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';
}

// Sorting and filtering types
type SortDirection = 'asc' | 'desc' | null;
type SortableColumn = 'orderId' | 'user' | 'project' | 'address' | 'date' | 'status';

interface SortState {
  column: SortableColumn | null;
  direction: SortDirection;
}

interface FilterState {
  status: string[];
  dateRange: string;
}

// Mock data with ISO date formats that will display as human-friendly text
const mockOrders: OrderData[] = [
  {
    id: '1',
    orderId: '#CM9801',
    user: {
      name: 'Natali Craig',
      avatar: '/src/assets/avatars/avatar-female15.png'
    },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: new Date(Date.now() - 15000).toISOString(), // 15 seconds ago - will show "Just now"
    status: 'In Progress'
  },
  {
    id: '2',
    orderId: '#CM9802',
    user: {
      name: 'Kate Morrison',
      avatar: '/src/assets/avatars/avatar-female09.png'
    },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: new Date(Date.now() - 60000).toISOString(), // 1 minute ago - will show "A minute ago"
    status: 'Complete'
  },
  {
    id: '3',
    orderId: '#CM9803',
    user: {
      name: 'Drew Cano',
      avatar: '/src/assets/avatars/avatar-male08.png'
    },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago - will show "5 minutes ago"
    status: 'Pending'
  },
  {
    id: '4',
    orderId: '#CM9804',
    user: {
      name: 'Orlando Diggs',
      avatar: '/src/assets/avatars/avatar-male06.png'
    },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago - will show "15 minutes ago"
    status: 'Approved'
  },
  {
    id: '5',
    orderId: '#CM9805',
    user: {
      name: 'Andi Lane',
      avatar: '/src/assets/avatars/avatar-female08.png'
    },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: new Date(Date.now() - 60 * 60000).toISOString(), // 1 hour ago - will show "1 hour ago"
    status: 'Rejected'
  },
  {
    id: '6',
    orderId: '#CM9806',
    user: {
      name: 'Tom Wilson',
      avatar: '/src/assets/avatars/avatar-male11.png'
    },
    project: 'E-commerce Site',
    address: 'Broadway New York',
    date: new Date(Date.now() - 3 * 60 * 60000).toISOString(), // 3 hours ago - will show "3 hours ago"
    status: 'In Progress'
  },
  {
    id: '7',
    orderId: '#CM9807',
    user: {
      name: 'Sarah Davis',
      avatar: '/src/assets/avatars/avatar-female05.png'
    },
    project: 'Mobile Banking App',
    address: 'Pine Street Seattle',
    date: new Date(Date.now() - 8 * 60 * 60000).toISOString(), // 8 hours ago - will show "8 hours ago"
    status: 'Complete'
  },
  {
    id: '8',
    orderId: '#CM9808',
    user: {
      name: 'Mike Johnson',
      avatar: '/src/assets/avatars/avatar-3d05.png'
    },
    project: 'Dashboard Redesign',
    address: 'Market Street Denver',
    date: new Date(Date.now() - 24 * 60 * 60000).toISOString(), // 1 day ago - will show "Yesterday"
    status: 'Pending'
  },
  {
    id: '9',
    orderId: '#CM9809',
    user: {
      name: 'Emily Chen',
      avatar: '/src/assets/avatars/avatar-3d03.png'
    },
    project: 'API Integration',
    address: 'Oak Avenue Chicago',
    date: new Date(Date.now() - 30 * 60 * 60000).toISOString(), // 30 hours ago - will show "Yesterday"
    status: 'Approved'
  },
  {
    id: '10',
    orderId: '#CM9810',
    user: {
      name: 'Alex Rodriguez',
      avatar: '/src/assets/avatars/avatar-male07.png'
    },
    project: 'Data Analytics Platform',
    address: 'Cedar Avenue Portland',
    date: '2024-09-19T14:30:00Z', // 2 days ago - will show "Sep 19, 2024"
    status: 'Complete'
  },
  {
    id: '11',
    orderId: '#CM9811',
    user: {
      name: 'Lisa Thompson',
      avatar: '/src/assets/avatars/avatar-female09.png'
    },
    project: 'Customer Portal',
    address: 'Elm Street Austin',
    date: '2024-09-15T10:15:00Z', // 6 days ago - will show "Sep 15, 2024"
    status: 'In Progress'
  },
  {
    id: '12',
    orderId: '#CM9812',
    user: {
      name: 'James Wilson',
      avatar: '/src/assets/avatars/avatar-3d08.png'
    },
    project: 'Payment Gateway',
    address: 'Maple Drive Boston',
    date: '2024-08-15T16:45:00Z', // 1 month ago - will show "Aug 15, 2024"
    status: 'Rejected'
  },
  {
    id: '13',
    orderId: '#CM9813',
    user: {
      name: 'Anna Garcia',
      avatar: '/src/assets/avatars/avatar-female15.png'
    },
    project: 'Content Management System',
    address: 'River Road Phoenix',
    date: '2024-07-22T09:30:00Z', // 2 months ago - will show "Jul 22, 2024"
    status: 'Complete'
  },
  {
    id: '14',
    orderId: '#CM9814',
    user: {
      name: 'Robert Kim',
      avatar: '/src/assets/avatars/avatar-male06.png'
    },
    project: 'Inventory System',
    address: 'Lake View Miami',
    date: '2023-12-10T11:20:00Z', // Last year - will show "Dec 10, 2023"
    status: 'Approved'
  },
  {
    id: '15',
    orderId: '#CM9815',
    user: {
      name: 'Jessica Brown',
      avatar: '/src/assets/avatars/avatar-female08.png'
    },
    project: 'Social Media App',
    address: 'Harbor Street San Diego',
    date: '2023-06-05T14:10:00Z', // Over a year ago - will show "Jun 5, 2023"
    status: 'Complete'
  }
];

const getStatusColor = (status: OrderData['status'], isDark: boolean) => {
  switch (status) {
    case 'In Progress':
      return {
        backgroundColor: isDark ? 'rgba(149, 164, 252, 0.1)' : 'rgba(149, 164, 252, 0.1)',
        color: isDark ? '#95A4FC' : '#8A8CD9',
        dotColor: '#95A4FC'
      };
    case 'Complete':
      return {
        backgroundColor: isDark ? 'rgba(161, 227, 203, 0.1)' : 'rgba(161, 227, 203, 0.1)',
        color: isDark ? '#A1E3CB' : '#4AA785',
        dotColor: '#A1E3CB'
      };
    case 'Pending':
      return {
        backgroundColor: isDark ? 'rgba(177, 227, 255, 0.1)' : 'rgba(177, 227, 255, 0.1)',
        color: isDark ? '#B1E3FF' : '#59A8D4',
        dotColor: '#B1E3FF'
      };
    case 'Approved':
      return {
        backgroundColor: isDark ? 'rgba(255, 233, 153, 0.1)' : 'rgba(255, 233, 153, 0.1)',
        color: isDark ? '#FFE999' : '#FFC555',
        dotColor: '#FFE999'
      };
    case 'Rejected':
      return {
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(28, 28, 28, 0.1)',
        color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)',
        dotColor: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)'
      };
    default:
      return {
        backgroundColor: 'transparent',
        color: 'inherit',
        dotColor: 'currentColor'
      };
  }
};

const StatusBadge: React.FC<{ status: OrderData['status']; isDark: boolean }> = ({ status, isDark }) => {
  const colors = getStatusColor(status, isDark);
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: colors.dotColor,
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: colors.color,
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '1.5em',
        }}
      >
        {status}
      </Typography>
    </Box>
  );
};

// Available filter options
const statusOptions = ['In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'];
const dateRangeOptions = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'All time'];

// Helper functions for sorting and filtering

const getStatusSortValue = (status: string): number => {
  const statusOrder = { 'Rejected': 0, 'Pending': 1, 'In Progress': 2, 'Approved': 3, 'Complete': 4 };
  return statusOrder[status as keyof typeof statusOrder] ?? 999;
};

const OrdersTable: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Existing state
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // New sorting and filtering state
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null
  });
  const [filterState, setFilterState] = useState<FilterState>({
    status: [],
    dateRange: 'All time'
  });
  
  // Menu anchors for dropdowns
  const [sortMenuAnchor, setSortMenuAnchor] = useState<null | HTMLElement>(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);

  // Comprehensive filtering and sorting logic
  const processedOrders = useMemo(() => {
    let result = [...mockOrders];

    // Apply text search filter
    if (searchTerm) {
      result = result.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterState.status.length > 0) {
      result = result.filter(order => filterState.status.includes(order.status));
    }

    // Apply date range filter
    if (filterState.dateRange !== 'All time') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      result = result.filter(order => {
        // Parse the mock date string to actual date
        const orderDate = new Date(getDateSortValue(order.date));
        
        switch (filterState.dateRange) {
          case 'Today':
            return orderDate >= today;
          case 'Yesterday': {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return orderDate >= yesterday && orderDate < today;
          }
          case 'Last 7 days': {
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          }
          case 'Last 30 days': {
            const monthAgo = new Date(today);
            monthAgo.setDate(monthAgo.getDate() - 30);
            return orderDate >= monthAgo;
          }
          default:
            return true;
        }
      });
    }

    // Apply sorting
    if (sortState.column && sortState.direction) {
      result.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortState.column) {
          case 'orderId':
            aValue = a.orderId;
            bValue = b.orderId;
            break;
          case 'user':
            aValue = a.user.name;
            bValue = b.user.name;
            break;
          case 'project':
            aValue = a.project;
            bValue = b.project;
            break;
          case 'address':
            aValue = a.address;
            bValue = b.address;
            break;
          case 'date':
            aValue = getDateSortValue(a.date);
            bValue = getDateSortValue(b.date);
            break;
          case 'status':
            aValue = getStatusSortValue(a.status);
            bValue = getStatusSortValue(b.status);
            break;
          default:
            return 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortState.direction === 'asc' ? comparison : -comparison;
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    return result;
  }, [searchTerm, filterState, sortState]);

  // Paginate data
  const paginatedOrders = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return processedOrders.slice(startIndex, startIndex + rowsPerPage);
  }, [processedOrders, page, rowsPerPage]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = paginatedOrders.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Sorting handlers
  const handleSort = useCallback((column: SortableColumn) => {
    setSortState(prevState => {
      if (prevState.column === column) {
        // Toggle direction: asc -> desc -> null -> asc
        const nextDirection: SortDirection = 
          prevState.direction === 'asc' ? 'desc' : 
          prevState.direction === 'desc' ? null : 'asc';
        return { column: nextDirection ? column : null, direction: nextDirection };
      } else {
        // New column, start with ascending
        return { column, direction: 'asc' };
      }
    });
    setPage(0); // Reset to first page when sorting
  }, []);

  const handleClearSort = useCallback(() => {
    setSortState({ column: null, direction: null });
  }, []);

  // Filter handlers
  const handleStatusFilter = useCallback((statuses: string[]) => {
    setFilterState(prev => ({ ...prev, status: statuses }));
    setPage(0); // Reset to first page when filtering
  }, []);

  const handleDateRangeFilter = useCallback((range: string) => {
    setFilterState(prev => ({ ...prev, dateRange: range }));
    setPage(0); // Reset to first page when filtering
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilterState({ status: [], dateRange: 'All time' });
    setPage(0);
  }, []);

  // Menu handlers
  const handleSortMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortMenuAnchor(null);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  // Custom styles based on theme
  const getTableStyles = () => ({
    backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
    color: isDark ? '#F8FAFC' : '#1C1C1C',
    '& .MuiTableCell-root': {
      borderBottom: isDark ? '1px solid rgba(248, 250, 252, 0.1)' : '1px solid rgba(28, 28, 28, 0.05)',
      color: isDark ? '#F8FAFC' : '#1C1C1C',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.5em',
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)',
      fontWeight: 400,
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(28, 28, 28, 0.02)',
    },
    '& .MuiTableRow-root.selected': {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F7F9FB',
    },
  });

  const getHeaderStyles = () => ({
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F7F9FB',
    color: isDark ? '#F8FAFC' : '#1C1C1C',
    borderRadius: '8px',
    padding: '8px',
    marginBottom: '12px',
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        backgroundColor: isDark ? 'rgba(28, 28, 28, 0.4)' : 'rgba(255, 255, 255, 0.4)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(28, 28, 28, 0.1)',
        borderRadius: '8px',
        '& fieldset': {
          border: 'none',
        },
        '&:hover fieldset': {
          border: 'none',
        },
        '&.Mui-focused fieldset': {
          border: 'none',
        },
        '& input': {
          color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.2)',
          fontSize: '14px',
          '&::placeholder': {
            color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.2)',
            opacity: 1,
          },
        },
      },
    },
    '& .MuiIconButton-root': {
      color: isDark ? '#FFFFFF' : '#1C1C1C',
      '&:hover': {
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(28, 28, 28, 0.1)',
      },
    },
  });

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with search and action buttons */}
      <Box sx={getHeaderStyles()}>
        <Toolbar sx={{ px: 1, minHeight: '48px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            {/* Action buttons */}
            <IconButton size="small" title="Add new order">
              <AddIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={handleFilterMenuClick}
              title="Filter orders"
              sx={{
                backgroundColor: filterState.status.length > 0 || filterState.dateRange !== 'All time' 
                  ? (isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)') 
                  : 'transparent'
              }}
            >
              <FilterIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={handleSortMenuClick}
              title="Sort orders"
              sx={{
                backgroundColor: sortState.column 
                  ? (isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)') 
                  : 'transparent'
              }}
            >
              <SortIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
          </Box>
          
          {/* Search field */}
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '140px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ width: 16, height: 16, color: 'currentColor' }} />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </Box>

      {/* Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          ...getTableStyles(),
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-labelledby="ordersTableTitle" size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: 24 }}>
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < paginatedOrders.length}
                  checked={paginatedOrders.length > 0 && selected.length === paginatedOrders.length}
                  onChange={handleSelectAllClick}
                  size="small"
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.2)',
                    '&.Mui-checked': {
                      color: isDark ? '#C6C7F8' : '#1C1C1C',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ width: 100 }}>
                <TableSortLabel
                  active={sortState.column === 'orderId'}
                  direction={sortState.column === 'orderId' ? sortState.direction || 'asc' : 'asc'}
                  onClick={() => handleSort('orderId')}
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(28, 28, 28, 0.4) !important',
                    '&:hover': {
                      color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(28, 28, 28, 0.6) !important',
                    },
                    '&.Mui-active': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                  }}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: 150 }}>
                <TableSortLabel
                  active={sortState.column === 'user'}
                  direction={sortState.column === 'user' ? sortState.direction || 'asc' : 'asc'}
                  onClick={() => handleSort('user')}
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(28, 28, 28, 0.4) !important',
                    '&:hover': {
                      color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(28, 28, 28, 0.6) !important',
                    },
                    '&.Mui-active': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                  }}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: 150 }}>
                <TableSortLabel
                  active={sortState.column === 'project'}
                  direction={sortState.column === 'project' ? sortState.direction || 'asc' : 'asc'}
                  onClick={() => handleSort('project')}
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(28, 28, 28, 0.4) !important',
                    '&:hover': {
                      color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(28, 28, 28, 0.6) !important',
                    },
                    '&.Mui-active': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                  }}
                >
                  Project
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: 200 }}>
                <TableSortLabel
                  active={sortState.column === 'address'}
                  direction={sortState.column === 'address' ? sortState.direction || 'asc' : 'asc'}
                  onClick={() => handleSort('address')}
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(28, 28, 28, 0.4) !important',
                    '&:hover': {
                      color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(28, 28, 28, 0.6) !important',
                    },
                    '&.Mui-active': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                  }}
                >
                  Address
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: 150 }}>
                <TableSortLabel
                  active={sortState.column === 'date'}
                  direction={sortState.column === 'date' ? sortState.direction || 'asc' : 'asc'}
                  onClick={() => handleSort('date')}
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(28, 28, 28, 0.4) !important',
                    '&:hover': {
                      color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(28, 28, 28, 0.6) !important',
                    },
                    '&.Mui-active': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                  }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: 110 }}>
                <TableSortLabel
                  active={sortState.column === 'status'}
                  direction={sortState.column === 'status' ? sortState.direction || 'asc' : 'asc'}
                  onClick={() => handleSort('status')}
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(28, 28, 28, 0.4) !important',
                    '&:hover': {
                      color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(28, 28, 28, 0.6) !important',
                    },
                    '&.Mui-active': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: isDark ? '#FFFFFF !important' : '#1C1C1C !important',
                    },
                  }}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ width: 50 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  className={isItemSelected ? 'selected' : ''}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={() => handleClick(row.id)}
                      size="small"
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(28, 28, 28, 0.2)',
                        '&.Mui-checked': {
                          color: isDark ? '#C6C7F8' : '#1C1C1C',
                        },
                      }}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row">
                    <Typography variant="body2" sx={{ color: isDark ? '#FFFFFF' : '#1C1C1C', fontSize: '12px' }}>
                      {row.orderId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        src={row.user.avatar}
                        sx={{ width: 24, height: 24 }}
                        alt={row.user.name}
                      />
                      <Typography variant="body2" sx={{ fontSize: '12px' }}>
                        {row.user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                      {row.project}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                      {row.address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarIcon sx={{ width: 16, height: 16, color: isDark ? '#FFFFFF' : '#1C1C1C' }} />
                      <Typography variant="body2" sx={{ fontSize: '12px' }}>
                        {formatTableDate(row.date)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} isDark={isDark} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={handleMenuClick}
                      sx={{
                        color: isDark ? '#FFFFFF' : '#1C1C1C',
                        '&:hover': {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(28, 28, 28, 0.1)',
                        },
                      }}
                    >
                      <MoreVertIcon sx={{ width: 16, height: 16 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            color: isDark ? '#F8FAFC' : '#1C1C1C',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(28, 28, 28, 0.1)',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Delete
        </MenuItem>
      </Menu>

      {/* Pagination */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        mt: 1,
        '& .MuiTablePagination-root': {
          color: isDark ? '#F8FAFC' : '#1C1C1C',
        },
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
          color: isDark ? '#F8FAFC' : '#1C1C1C',
          fontSize: '14px',
        },
        '& .MuiIconButton-root': {
          color: isDark ? '#FFFFFF' : '#1C1C1C',
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(28, 28, 28, 0.1)',
          },
        },
        '& .MuiTablePagination-select': {
          color: isDark ? '#F8FAFC' : '#1C1C1C',
        },
      }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={processedOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              minHeight: '48px',
            },
          }}
        />
      </Box>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortMenuAnchor}
        open={Boolean(sortMenuAnchor)}
        onClose={handleSortMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            color: isDark ? '#F8FAFC' : '#1C1C1C',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(28, 28, 28, 0.1)',
            borderRadius: '8px',
            boxShadow: isDark 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }
        }}
      >
        <MenuItem onClick={() => { handleSort('orderId'); handleSortMenuClose(); }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="body2">Sort by Order ID</Typography>
            {sortState.column === 'orderId' && (
              sortState.direction === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />
            )}
          </Box>
        </MenuItem>
        <MenuItem onClick={() => { handleSort('user'); handleSortMenuClose(); }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="body2">Sort by User</Typography>
            {sortState.column === 'user' && (
              sortState.direction === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />
            )}
          </Box>
        </MenuItem>
        <MenuItem onClick={() => { handleSort('project'); handleSortMenuClose(); }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="body2">Sort by Project</Typography>
            {sortState.column === 'project' && (
              sortState.direction === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />
            )}
          </Box>
        </MenuItem>
        <MenuItem onClick={() => { handleSort('date'); handleSortMenuClose(); }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="body2">Sort by Date</Typography>
            {sortState.column === 'date' && (
              sortState.direction === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />
            )}
          </Box>
        </MenuItem>
        <MenuItem onClick={() => { handleSort('status'); handleSortMenuClose(); }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="body2">Sort by Status</Typography>
            {sortState.column === 'status' && (
              sortState.direction === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />
            )}
          </Box>
        </MenuItem>
        {sortState.column && (
          <>
            <MenuItem onClick={() => { handleClearSort(); handleSortMenuClose(); }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ClearIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">Clear Sort</Typography>
              </Box>
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={handleFilterMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            color: isDark ? '#F8FAFC' : '#1C1C1C',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(28, 28, 28, 0.1)',
            borderRadius: '8px',
            boxShadow: isDark 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            minWidth: '200px',
            padding: '8px',
          }
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Filter by Status
          </Typography>
          <Box sx={{ mb: 2 }}>
            {statusOptions.map((status) => (
              <MenuItem
                key={status}
                onClick={() => {
                  const newStatuses = filterState.status.includes(status)
                    ? filterState.status.filter(s => s !== status)
                    : [...filterState.status, status];
                  handleStatusFilter(newStatuses);
                }}
                sx={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: filterState.status.includes(status)
                    ? (isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)')
                    : 'transparent'
                }}
              >
                <Checkbox
                  checked={filterState.status.includes(status)}
                  size="small"
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(28, 28, 28, 0.4)',
                    '&.Mui-checked': {
                      color: isDark ? '#C6C7F8' : '#1C1C1C',
                    },
                  }}
                />
                <StatusBadge status={status as OrderData['status']} isDark={isDark} />
              </MenuItem>
            ))}
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Filter by Date Range
          </Typography>
          <Box sx={{ mb: 2 }}>
            {dateRangeOptions.map((range) => (
              <MenuItem
                key={range}
                onClick={() => {
                  handleDateRangeFilter(range);
                  handleFilterMenuClose();
                }}
                sx={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: filterState.dateRange === range
                    ? (isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)')
                    : 'transparent'
                }}
              >
                <Typography variant="body2">{range}</Typography>
              </MenuItem>
            ))}
          </Box>

          {(filterState.status.length > 0 || filterState.dateRange !== 'All time') && (
            <MenuItem 
              onClick={() => { 
                handleClearFilters(); 
                handleFilterMenuClose(); 
              }}
              sx={{
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
                border: isDark ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(239, 68, 68, 0.2)',
                color: isDark ? '#FCA5A5' : '#DC2626',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ClearIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">Clear All Filters</Typography>
              </Box>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </Box>
  );
};

export default OrdersTable;

interface Customer {
  id: number;
  customer_name: string;
  mobile_number: number;
  line_type: number;
  charging_date: string | null;
  arrival_time: string | null;
  provider: string | null;
  ownership: string | null;
  payment_status: string;
  monthly_price: number | null;
  renewal_status: string;
  subscription_type?: string | null;
  notes: string | null;
  created_at?: string;
  updated_at?: string;
}

interface CustomerGroup {
  groupName: string;
  customers: Customer[];
  count: number;
}

export const groupCustomersByName = (customers: Customer[]): CustomerGroup[] => {
  const groups: { [key: string]: Customer[] } = {};
  const others: Customer[] = [];

  customers.forEach(customer => {
    const name = customer.customer_name?.trim().toLowerCase() || 'غير محدد';

    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push(customer);
  });

  const result: CustomerGroup[] = [];
  const sortedGroupNames = Object.keys(groups).sort();

  sortedGroupNames.forEach(groupName => {
    const groupCustomers = groups[groupName];

    if (groupCustomers.length >= 2) {
      result.push({
        groupName: groupCustomers[0].customer_name || 'غير محدد',
        customers: groupCustomers,
        count: groupCustomers.length
      });
    } else {
      others.push(...groupCustomers);
    }
  });

  if (others.length > 0) {
    result.push({
      groupName: 'عملاء متفرقون',
      customers: others,
      count: others.length
    });
  }

  return result;
};

export const getSubscriptionTypeBadgeClass = (type: string | null | undefined): string => {
  if (type === 'مدفوع كامل') {
    return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0';
  }
  return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0';
};

export const getSubscriptionTypeIcon = (type: string | null | undefined): string => {
  return type === 'مدفوع كامل' ? '💎' : '📅';
};

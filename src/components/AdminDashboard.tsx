import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { CustomerTable } from "@/components/CustomerTable";
import { CustomerForm } from "@/components/CustomerForm";
import { BulkCustomerForm } from "@/components/BulkCustomerForm";
import { BulkEditForm } from "@/components/BulkEditForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar as BarChart3, Users, Plus, UserPlus, CreditCard as Edit } from "lucide-react";

interface Customer {
  id: number;
  customer_name: string;
  mobile_number: number;
  line_type: number;
  charging_date: string | null;
  payment_status: string;
  monthly_price: number | null;
  renewal_status: string;
  created_at?: string;
  updated_at?: string;
}

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [showBulkEditForm, setShowBulkEditForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
    setShowBulkForm(false);
    setShowBulkEditForm(false);
    setActiveTab("customers");
  };

  const handleAddBulkCustomers = () => {
    setEditingCustomer(null);
    setShowForm(false);
    setShowBulkForm(true);
    setShowBulkEditForm(false);
    setActiveTab("customers");
  };

  const handleBulkEdit = () => {
    setEditingCustomer(null);
    setShowForm(false);
    setShowBulkForm(false);
    setShowBulkEditForm(true);
    setActiveTab("customers");
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
    setShowBulkForm(false);
    setShowBulkEditForm(false);
  };

  const handleSaveCustomer = () => {
    setShowForm(false);
    setShowBulkForm(false);
    setShowBulkEditForm(false);
    setEditingCustomer(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setShowBulkForm(false);
    setShowBulkEditForm(false);
    setEditingCustomer(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {!showForm && !showBulkForm && !showBulkEditForm ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-2 animate-scale-in shadow-lg glass-effect backdrop-blur-xl h-14">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 transition-all duration-300 smooth-hover text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                <BarChart3 className="h-5 w-5" />
                لوحة التحكم
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex items-center gap-2 transition-all duration-300 smooth-hover text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                <Users className="h-5 w-5" />
                العملاء
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="mt-8">
            <Dashboard />
          </TabsContent>

          <TabsContent value="customers" className="mt-8">
            <CustomerTable 
              onAddCustomer={handleAddCustomer}
              onAddBulkCustomers={handleAddBulkCustomers}
              onBulkEdit={handleBulkEdit}
              onEditCustomer={handleEditCustomer}
            />
          </TabsContent>
        </Tabs>
      ) : showForm ? (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onCancel={handleCancelForm}
        />
      ) : showBulkForm ? (
        <BulkCustomerForm
          onSave={handleSaveCustomer}
          onCancel={handleCancelForm}
        />
      ) : (
        <BulkEditForm
          onSave={handleSaveCustomer}
          onCancel={handleCancelForm}
        />
      )}

      {!showForm && !showBulkForm && !showBulkEditForm && (
        <div className="fixed bottom-8 left-8 flex flex-col gap-3 z-50">
          <Button
            onClick={handleBulkEdit}
            size="lg"
            className="rounded-full h-16 w-16 shadow-2xl smooth-hover bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-2 border-white/20"
            title="تعديل جماعي"
          >
            <Edit className="h-7 w-7" />
          </Button>
          <Button
            onClick={handleAddBulkCustomers}
            size="lg"
            className="rounded-full h-16 w-16 shadow-2xl smooth-hover bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-2 border-white/20"
            title="إضافة عدة عملاء"
          >
            <UserPlus className="h-7 w-7" />
          </Button>
          <Button
            onClick={handleAddCustomer}
            size="lg"
            className="rounded-full h-16 w-16 shadow-2xl smooth-hover bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-2 border-white/20 animate-pulse"
            title="إضافة عميل واحد"
          >
            <Plus className="h-7 w-7" />
          </Button>
        </div>
      )}
    </div>
  );
};
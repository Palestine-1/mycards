/*
  # إنشاء جدول العملاء مع نوع الاشتراك

  1. جداول جديدة
    - `customers`
      - `id` (serial, primary key)
      - `customer_name` (text, اسم العميل)
      - `mobile_number` (bigint, رقم الموبايل)
      - `line_type` (integer, نوع الخط)
      - `charging_date` (date, تاريخ الشحن)
      - `arrival_time` (date, وقت وصول الخط)
      - `provider` (text, مزود الخدمة)
      - `ownership` (text, ملكية الخط)
      - `payment_status` (text, حالة الدفع)
      - `monthly_price` (numeric, السعر الشهري)
      - `renewal_status` (text, حالة التجديد)
      - `sub_type` (text, نوع الاشتراك - شهري أو مدفوع كامل)
      - `notes` (text, ملاحظات)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. الأمان
    - تفعيل RLS على جدول customers
    - إضافة سياسات للوصول العام (للقراءة والكتابة)
*/

-- إنشاء جدول العملاء
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL DEFAULT '',
  mobile_number BIGINT NOT NULL,
  line_type INTEGER NOT NULL DEFAULT 40,
  charging_date DATE,
  arrival_time DATE,
  provider TEXT DEFAULT 'orange',
  ownership TEXT DEFAULT 'nader',
  payment_status TEXT DEFAULT 'لم يدفع',
  monthly_price NUMERIC(10,2),
  renewal_status TEXT DEFAULT 'لم يتم',
  sub_type TEXT DEFAULT 'شهري',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- سياسات الوصول لجدول customers
CREATE POLICY "Enable read access for all users" ON customers FOR SELECT TO public USING (true);
CREATE POLICY "Enable insert access for all users" ON customers FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON customers FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete access for all users" ON customers FOR DELETE TO public USING (true);

-- إنشاء دالة لتحديث updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء trigger لتحديث updated_at تلقائياً
CREATE TRIGGER update_customers_updated_at 
  BEFORE UPDATE ON customers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

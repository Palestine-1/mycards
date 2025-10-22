/*
  # إنشاء جدول الأسماء المقترحة

  1. جداول جديدة
    - `suggested_names`
      - `id` (uuid, primary key)
      - `mobile_number` (text, رقم الموبايل)
      - `suggested_name` (text, الاسم المقترح)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. الأمان
    - تفعيل RLS على جدول suggested_names
    - إضافة سياسات للوصول العام (للقراءة والكتابة)
    
  3. ملاحظات
    - يتم استخدام هذا الجدول لتخزين الأسماء المقترحة لكل رقم موبايل
    - يتم عرض الاسم المقترح تحت اسم العميل في صفحة العملاء
*/

-- إنشاء دالة لتحديث updated_at إذا لم تكن موجودة
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء جدول الأسماء المقترحة
CREATE TABLE IF NOT EXISTS suggested_names (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile_number TEXT NOT NULL UNIQUE,
  suggested_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE suggested_names ENABLE ROW LEVEL SECURITY;

-- سياسات الوصول
CREATE POLICY "Enable read access for all users" 
  ON suggested_names FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Enable insert access for all users" 
  ON suggested_names FOR INSERT 
  TO public 
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users" 
  ON suggested_names FOR UPDATE 
  TO public 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" 
  ON suggested_names FOR DELETE 
  TO public 
  USING (true);

-- إنشاء trigger لتحديث updated_at تلقائياً
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_suggested_names_updated_at'
  ) THEN
    CREATE TRIGGER update_suggested_names_updated_at 
      BEFORE UPDATE ON suggested_names 
      FOR EACH ROW 
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

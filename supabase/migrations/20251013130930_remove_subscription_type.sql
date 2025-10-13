/*
  # حذف عمود نوع الاشتراك

  1. التغييرات
    - حذف عمود `subscription_type` من جدول `customers`
  
  2. ملاحظات
    - سيتم حذف العمود نهائياً من قاعدة البيانات
*/

-- حذف عمود subscription_type
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'subscription_type'
  ) THEN
    ALTER TABLE customers DROP COLUMN subscription_type;
  END IF;
END $$;

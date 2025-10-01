import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, User, Phone, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  onLogin: (userType: string, username: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [userType, setUserType] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getDisplayNameForSingleUser = async (mobileNumber: string) => {
    try {
      // First, try to get suggested name
      const { data: suggestedData } = await supabase
        .from('suggested_names')
        .select('suggested_name')
        .eq('mobile_number', mobileNumber)
        .maybeSingle();

      if (suggestedData?.suggested_name) {
        return suggestedData.suggested_name;
      }

      // If no suggested name, try to get customer name from database
      const { data: customerData } = await supabase
        .from('customers')
        .select('customer_name')
        .eq('mobile_number', parseInt(mobileNumber))
        .maybeSingle();

      if (customerData?.customer_name) {
        return customerData.customer_name;
      }

      // Fallback to mobile number
      return mobileNumber;
    } catch (error) {
      console.error('Error fetching display name:', error);
      return mobileNumber;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let isValid = false;
      let actualUsername = "";

      if (userType === "admin") {
        if (username === "palestine71023" && password === "159200209Cc?") {
          isValid = true;
          actualUsername = "Admin";
        }
      } else if (userType === "multiple") {
        if (username === "aboselem892025" && password === "aymenseleemcardsINFO1125?") {
          isValid = true;
          actualUsername = "abo selem";
        } else if (username === "ahmedfathy892025" && password === "abofathyCARDSINFO@@?") {
          isValid = true;
          actualUsername = "ahmed fathy";
        } else if (username === "ahmedeldeeb982025" && password === "ahmedebrahim179355??SS") {
          isValid = true;
          actualUsername = "ahmed eldeeb";
        } else if (username === "saedzidan982025" && password === "saeedzidan159228Zz%%") {
          isValid = true;
          actualUsername = "saed zidan";
        }
      } else if (userType === "single") {
        // For single user, username should be a mobile number, no password required
        if (username) {
          isValid = true;
          actualUsername = await getDisplayNameForSingleUser(username);
        }
      }

      if (isValid) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحباً ${actualUsername}`,
        });
        // For single users, pass the mobile number (username), not the display name
        onLogin(userType, userType === "single" ? username : actualUsername);
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "اسم المستخدم أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col content-overlay relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl animate-scale-in glass-effect gradient-border relative overflow-hidden backdrop-blur-xl border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-60"></div>
            <div className="relative z-10">
          <CardHeader className="text-center">
            <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-blue-500 via-blue-600 to-emerald-600 rounded-2xl w-20 h-20 flex items-center justify-center shadow-xl smooth-hover">
              <Network className="h-10 w-10 text-white drop-shadow-lg" />
            </div>
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 tracking-tight">
              تسجيل الدخول
            </CardTitle>
            
            {/* Islamic Verse */}
            <div className="mt-6 text-center animate-fade-in">
              <p className="golden-text text-lg font-bold leading-relaxed px-4" style={{ fontFamily: 'serif' }}>
                إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا
              </p>
              <p className="text-sm text-muted-foreground mt-2 opacity-80">
                صدق الله العظيم
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-base font-semibold">نوع المستخدم</Label>
                <Select value={userType} onValueChange={setUserType} required>
                  <SelectTrigger className="transition-all duration-300 hover:border-blue-400 focus:border-blue-500 h-12 text-base smooth-hover">
                    <SelectValue placeholder="اختر نوع المستخدم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin" className="hover:bg-blue-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-blue-600" />
                        مدير النظام
                      </div>
                    </SelectItem>
                    <SelectItem value="multiple" className="hover:bg-green-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-green-600" />
                        مستخدم متعدد الخطوط
                      </div>
                    </SelectItem>
                    <SelectItem value="single" className="hover:bg-purple-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-purple-600" />
                        مستخدم عادي
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-base font-semibold">
                  {userType === "single" ? "رقم الموبايل" : "اسم المستخدم"}
                </Label>
                <div className="relative">
                  {userType === "single" ? (
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400 transition-all duration-300" />
                  ) : (
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400 transition-all duration-300" />
                  )}
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={userType === "single" ? "أدخل رقم الموبايل" : "أدخل اسم المستخدم"}
                    className="pl-10 text-right h-12 text-base transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 smooth-hover"
                    required
                  />
                </div>
              </div>

              {userType !== "single" && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="password" className="text-base font-semibold">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400 transition-all duration-300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="pl-10 pr-10 text-right h-12 text-base transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 smooth-hover"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-all duration-300 smooth-hover"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold hover-scale bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-600 hover:from-blue-600 hover:via-blue-700 hover:to-emerald-700 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30"
                disabled={loading || !userType}
              >
                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
          </CardContent>
            </div>
        </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};
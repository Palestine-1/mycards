import { Button } from "@/components/ui/button";
import { Facebook, MessageCircle, Network, Heart, Mail, Phone } from "lucide-react";

export const Footer = () => {
  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/palestine7102023y/", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+201559181558", "_blank");
  };

  return (
    <footer className="mt-auto glass-effect border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="text-center md:text-right space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-xl smooth-hover">
                <Network className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">نظام إدارة خطوط الإنترنت</h3>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">
              منصة احترافية متكاملة لإدارة خطوط الإنترنت والاشتراكات الشهرية بكفاءة وسهولة
            </p>
          </div>

          <div className="text-center space-y-5">
            <h4 className="text-xl font-bold flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              <Heart className="h-6 w-6 text-pink-400 animate-pulse" />
              للتواصل مع المطور
            </h4>
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleFacebookClick}
                className="smooth-hover bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl text-white font-semibold"
              >
                <Facebook className="h-5 w-5 ml-2" />
                تواصل عبر فيسبوك
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                className="smooth-hover bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 shadow-lg hover:shadow-xl text-white font-semibold"
              >
                <MessageCircle className="h-5 w-5 ml-2" />
                تواصل عبر واتساب
              </Button>
            </div>
          </div>

          <div className="text-center md:text-left space-y-4">
            <div className="glass-effect rounded-xl p-5 border border-white/10 smooth-hover">
              <h4 className="text-lg font-bold mb-3 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">معلومات التواصل</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">+201559181558</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">دعم فني متاح 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              © 2025 جميع الحقوق محفوظة - نظام إدارة خطوط الإنترنت
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              تم التطوير بـ <Heart className="h-4 w-4 text-pink-400 animate-pulse" /> بواسطة فريق محترف
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

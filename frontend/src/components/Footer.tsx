import React from 'react';
import { Heart, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('footer_home'), href: '#home' },
    { name: t('footer_about'), href: '#about' },
    { name: t('footer_plans'), href: '#plans' },
    { name: t('footer_contact'), href: '#contact' }
  ];

  const services = [
    t('footer_service1'),
    t('footer_service2'),
    t('footer_service3'),
    t('footer_service4'),
    t('footer_service5')
  ];

  return (
    <footer className="bg-gradient-to-br from-islamic-green-800 to-islamic-green-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="bg-white/20 p-3 rounded-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-amiri">{t('site_title')} {t('footer_ruqyah')}</h3>
                <p className="text-islamic-green-200">{t('site_subtitle')}</p>
              </div>
            </div>
            
            <p className="text-islamic-green-100 leading-relaxed mb-6 max-w-md">
              {t('footer_about_text')}
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse text-islamic-green-200">
                <Phone className="w-5 h-5" />
                <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override', textAlign: 'left', display: 'inline' }}>{t('footer_phone')}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-islamic-green-200">
                <Mail className="w-5 h-5" />
                <span>{t('footer_email')}</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-islamic-green-200">
                <MapPin className="w-5 h-5" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{t('footer_address')}</span>
                  <span className="text-xs text-islamic-green-100">{t('footer_address_details')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 font-amiri">{t('footer_quick_links')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-islamic-green-200 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse"
                  >
                    <Star className="w-4 h-4" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 font-amiri">{t('footer_services')}</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <div className="text-islamic-green-200 flex items-center space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-islamic-gold-400 rounded-full"></div>
                    <span>{service}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <Clock className="w-6 h-6 text-islamic-gold-400" />
            <h4 className="text-xl font-bold font-amiri">{t('working_hours')}</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-islamic-green-100">
            <div className="flex flex-col items-center text-islamic-green-100 mb-2">
              <span className="font-bold text-base mb-1">{t('footer_working_days')}</span>
              <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }} className="text-base font-bold">09:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="bg-gradient-to-r from-islamic-gold-500/20 to-islamic-gold-600/20 rounded-2xl p-8 mb-8 text-center">
          <div className="text-2xl md:text-3xl font-amiri text-islamic-gold-300 mb-4 leading-relaxed">
            {t('footer_quote')}
          </div>
          <p className="text-islamic-green-200">
            {t('footer_quote_ref')}
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-islamic-green-700 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <div className="text-islamic-green-200">
              © {currentYear} {t('footer_copyright')}
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 md:space-x-reverse space-y-2 md:space-y-0">
              <a
                href="#"
                className="text-islamic-green-200 hover:text-white transition-colors duration-200"
              >
                {t('footer_privacy')}
              </a>
              <a
                href="#"
                className="text-islamic-green-200 hover:text-white transition-colors duration-200"
              >
                {t('footer_terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
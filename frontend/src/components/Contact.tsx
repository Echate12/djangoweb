import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = ({ selectedPlan }: { selectedPlan?: string | null }) => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
  
    try {
      const res = await fetch('https://laaroussihealing.fly.dev/api/get_whatsapp_link/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, selectedPlan, lang: i18n.language })
      });
  
      if (res.ok) {
        const data = await res.json();
        if (data.whatsapp_url) {
          window.location.href = data.whatsapp_url;  // Redirect to WhatsApp with the message
        } else {
          setStatus('error');
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  
  const phoneDisplay = "+212 629916074";
  const phoneLink = "+212629916074";
  const whatsappLink = "212629916074";
  const contactInfo = [
    {
      icon: Phone,
      title: t('contact_us'),
      details: [
        <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override', textAlign: 'left', display: 'inline-block', width: '100%' }}>{phoneDisplay}</span>
      ],
      color: 'islamic-green'
    },
    {
      icon: Mail,
      title: t('email'),
      details: ['rahalsahrawi@gmail.com'],
      color: 'islamic-gold'
    },
    {
      icon: MapPin,
      title: t('address'),
      details: [
        <div className="flex flex-col items-start">
          <span className="font-semibold">{t('footer_address')}</span>
          <span className="text-xs text-gray-400">{t('footer_address_details')}</span>
        </div>
      ],
      color: 'islamic-green'
    },
    {
      icon: Clock,
      title: t('working_hours'),
      details: [
        <div className="flex flex-col items-start">
          <span className="font-semibold">{t('footer_working_days')}</span>
          <span className="text-xs">09:00 AM - 6:00 PM</span>
        </div>
      ],
      color: 'islamic-gold'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-islamic-green-800 mb-6 font-amiri">
            {t('contact_us')}
          </h2>
          <div className="flex justify-center items-center mb-6">
            <div className="h-1 w-20 bg-gradient-islamic rounded-full mx-2"></div>
            <MessageCircle className="w-6 h-6 text-islamic-gold-500" />
            <div className="h-1 w-20 bg-gradient-islamic rounded-full mx-2"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact_paragraph')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold text-islamic-green-800 mb-8 font-amiri">
              {t('contact_info')}
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className={`bg-gradient-${info.color} p-3 rounded-xl`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-islamic-green-800 mb-2">
                        {info.title}
                      </h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 space-y-4">
              <a
                href={`tel:${phoneLink}`}
                className="flex items-center justify-center space-x-3 space-x-reverse bg-gradient-islamic text-white px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 w-full"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">{t('call_now')}</span>
              </a>
              <a
                href={`https://wa.me/${whatsappLink}`}
                className="flex items-center justify-center space-x-3 space-x-reverse bg-green-600 text-white px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 w-full"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">{t('whatsapp')}</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-3xl font-bold text-islamic-green-800 mb-8 font-amiri">
              {t('send_message')}
            </h3>
            {selectedPlan && (
              <div className="mb-4 p-4 bg-islamic-green-50 border-l-4 border-islamic-green-500 rounded">
                <span className="font-semibold text-islamic-green-800">{t('plan_basic_name') === selectedPlan ? t('plan_basic_name') : selectedPlan}</span>
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-islamic-green-800 font-semibold mb-2">
                    {t('full_name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-200 transition-all duration-200"
                    placeholder="اسمك الكامل"
                    required
                  />
                </div>
                <div>
                  <label className="block text-islamic-green-800 font-semibold mb-2">
                    {t('phone_number')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-200 transition-all duration-200"
                    placeholder="رقم هاتفك"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-islamic-green-800 font-semibold mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-200 transition-all duration-200"
                  placeholder="بريدك الإلكتروني"
                  required
                />
              </div>
              
              <div>
                <label className="block text-islamic-green-800 font-semibold mb-2">
                  {t('message')}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-islamic-green-500 focus:ring-2 focus:ring-islamic-green-200 transition-all duration-200"
                  placeholder="اكتب تفاصيل حالتك أو استفسارك هنا..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-gradient-islamic text-white px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold text-lg"
                disabled={status === 'sending'}
              >
                <Send className="w-5 h-5" />
                <span>{t('send')}</span>
              </button>
            </form>
            {status === 'success' && (
              <p className="text-green-600 font-semibold mt-4">{t('success')}</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 font-semibold mt-4">{t('error')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

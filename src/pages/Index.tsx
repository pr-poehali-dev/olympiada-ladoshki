import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [userRole, setUserRole] = useState<'student' | 'parent' | 'teacher'>('student');

  const olympiads = [
    {
      id: 1,
      subject: 'Математика',
      icon: 'Calculator',
      grades: '1-4 класс',
      date: '15-30 ноября 2025',
      status: 'open',
      participants: 2345,
      price: 'Бесплатно',
      color: 'from-lime-400 to-lime-600'
    },
    {
      id: 2,
      subject: 'Русский язык',
      icon: 'BookOpen',
      grades: '1-4 класс',
      date: '1-15 декабря 2025',
      status: 'soon',
      participants: 1876,
      price: 'Бесплатно',
      color: 'from-sky-400 to-sky-600'
    },
    {
      id: 3,
      subject: 'Окружающий мир',
      icon: 'Globe',
      grades: '1-4 класс',
      date: '20 декабря - 5 января',
      status: 'soon',
      participants: 1432,
      price: 'Бесплатно',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 4,
      subject: 'Английский язык',
      icon: 'Languages',
      grades: '2-4 класс',
      date: '10-25 января 2026',
      status: 'planned',
      participants: 987,
      price: 'Бесплатно',
      color: 'from-purple-400 to-purple-600'
    },
  ];

  const steps = [
    { icon: 'Search', title: 'Выберите олимпиаду', desc: 'Найдите подходящий предмет и класс' },
    { icon: 'UserPlus', title: 'Зарегистрируйтесь', desc: 'Создайте личный кабинет за 2 минуты' },
    { icon: 'PenTool', title: 'Пройдите задания', desc: 'Решайте задачи в удобное время' },
    { icon: 'Award', title: 'Получите диплом', desc: 'Скачайте наградные материалы' },
  ];

  const faqs = [
    { q: 'Как принять участие в олимпиаде?', a: 'Зарегистрируйтесь на сайте, выберите олимпиаду и пройдите задания в указанные сроки.' },
    { q: 'Сколько стоит участие?', a: 'Большинство олимпиад бесплатные. Платными могут быть только печатные дипломы и медали.' },
    { q: 'Когда будут результаты?', a: 'Результаты публикуются через 3-5 рабочих дней после окончания олимпиады.' },
    { q: 'Как получить диплом?', a: 'Электронный диплом доступен для скачивания в личном кабинете сразу после публикации результатов.' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { label: 'Открыта', variant: 'default' as const, icon: 'CircleDot' },
      soon: { label: 'Скоро', variant: 'secondary' as const, icon: 'Clock' },
      planned: { label: 'Запланирована', variant: 'outline' as const, icon: 'Calendar' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon name={config.icon} size={12} />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="text-4xl">👋</div>
            <span className="font-heading text-2xl font-bold text-lime-600">Ладошки</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#olympiads" className="text-sm font-medium hover:text-lime-600 transition-colors">Олимпиады</a>
            <a href="#results" className="text-sm font-medium hover:text-lime-600 transition-colors">Результаты</a>
            <a href="#faq" className="text-sm font-medium hover:text-lime-600 transition-colors">FAQ</a>
          </nav>
          <Button className="bg-lime-500 hover:bg-lime-600 text-white">
            <Icon name="User" size={16} className="mr-2" />
            Войти
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-100 via-sky-50 to-orange-50 opacity-60"></div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <div className="mb-6 flex justify-center gap-3 text-6xl md:text-8xl">
              <span className="animate-[scale-in_0.5s_ease-out]">👋</span>
              <span className="animate-[scale-in_0.6s_ease-out]">✨</span>
              <span className="animate-[scale-in_0.7s_ease-out]">🏆</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-lime-600 to-sky-600 bg-clip-text text-transparent">
              Олимпиады для умных ребят
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Проверь свои знания, получи диплом и покажи всем, какой ты молодец! Участвуй онлайн в удобное время.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-white text-lg px-8 hover:scale-105 transition-transform">
                <Icon name="Trophy" size={20} className="mr-2" />
                Принять участие
              </Button>
              <Button size="lg" variant="outline" className="border-lime-500 text-lime-600 hover:bg-lime-50 text-lg px-8">
                <Icon name="FileText" size={20} className="mr-2" />
                Демоверсии заданий
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                    <Icon name={step.icon as any} size={28} className="text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-lime-400 to-transparent -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="olympiads" className="py-16 bg-gradient-to-b from-white to-lime-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Ближайшие олимпиады</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Выбери предмет, который тебе интересен, и покажи свои знания!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Предмет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все предметы</SelectItem>
                <SelectItem value="math">Математика</SelectItem>
                <SelectItem value="russian">Русский язык</SelectItem>
                <SelectItem value="world">Окружающий мир</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Класс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все классы</SelectItem>
                <SelectItem value="1">1 класс</SelectItem>
                <SelectItem value="2">2 класс</SelectItem>
                <SelectItem value="3">3 класс</SelectItem>
                <SelectItem value="4">4 класс</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {olympiads.map((olympiad, idx) => (
              <Card key={olympiad.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className={`h-2 bg-gradient-to-r ${olympiad.color}`}></div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${olympiad.color} flex items-center justify-center`}>
                      <Icon name={olympiad.icon as any} size={24} className="text-white" />
                    </div>
                    {getStatusBadge(olympiad.status)}
                  </div>
                  <CardTitle className="font-heading">{olympiad.subject}</CardTitle>
                  <CardDescription>{olympiad.grades}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon name="Calendar" size={16} />
                    <span>{olympiad.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon name="Users" size={16} />
                    <span>{olympiad.participants} участников</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-lime-600">
                    <Icon name="Tag" size={16} />
                    <span>{olympiad.price}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1 bg-lime-500 hover:bg-lime-600 text-white">
                    Участвовать
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Info" size={18} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Результаты и награды</h2>
          <p className="text-center text-gray-600 mb-12">Найди свой результат и скачай диплом</p>
          
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Поиск результатов</CardTitle>
                <CardDescription>Введите ФИО участника или номер сертификата</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Иванов Иван Иванович или №123456" className="flex-1" />
                  <Button className="bg-lime-500 hover:bg-lime-600 text-white">
                    <Icon name="Search" size={18} />
                  </Button>
                </div>
                
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400">
                  Введите данные для поиска результатов
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 p-6 bg-gradient-to-br from-lime-50 to-sky-50 rounded-2xl">
              <h3 className="font-heading font-semibold text-lg mb-4">Личный кабинет</h3>
              <Tabs value={userRole} onValueChange={(v) => setUserRole(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student">Ученик</TabsTrigger>
                  <TabsTrigger value="parent">Родитель</TabsTrigger>
                  <TabsTrigger value="teacher">Учитель</TabsTrigger>
                </TabsList>
                <TabsContent value="student" className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Icon name="Trophy" size={24} className="text-lime-500" />
                    <div className="flex-1">
                      <div className="font-semibold">Мои олимпиады</div>
                      <div className="text-sm text-gray-600">3 активных, 5 завершено</div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Icon name="Award" size={24} className="text-sky-500" />
                    <div className="flex-1">
                      <div className="font-semibold">Мои дипломы</div>
                      <div className="text-sm text-gray-600">5 дипломов доступно</div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                </TabsContent>
                <TabsContent value="parent" className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Icon name="Users" size={24} className="text-lime-500" />
                    <div className="flex-1">
                      <div className="font-semibold">Управление детьми</div>
                      <div className="text-sm text-gray-600">2 ребенка добавлено</div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Icon name="CreditCard" size={24} className="text-sky-500" />
                    <div className="flex-1">
                      <div className="font-semibold">История оплат</div>
                      <div className="text-sm text-gray-600">Просмотр квитанций</div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                </TabsContent>
                <TabsContent value="teacher" className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Icon name="UserPlus" size={24} className="text-lime-500" />
                    <div className="flex-1">
                      <div className="font-semibold">Массовая регистрация</div>
                      <div className="text-sm text-gray-600">Зарегистрировать класс</div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                    <Icon name="BarChart" size={24} className="text-sky-500" />
                    <div className="flex-1">
                      <div className="font-semibold">Отчёты по классу</div>
                      <div className="text-sm text-gray-600">Сводные результаты</div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-gradient-to-b from-white to-lime-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Частые вопросы</h2>
          <p className="text-center text-gray-600 mb-12">Ответы на популярные вопросы</p>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6 bg-white">
                  <AccordionTrigger className="font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 p-6 bg-gradient-to-br from-sky-500 to-lime-500 rounded-2xl text-white text-center">
              <Icon name="MessageCircle" size={32} className="mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-xl mb-2">Нужна помощь?</h3>
              <p className="mb-4 opacity-90">Наша команда поддержки готова ответить на ваши вопросы</p>
              <Button variant="secondary" size="lg">
                <Icon name="Mail" size={18} className="mr-2" />
                Написать в поддержку
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">👋</div>
                <span className="font-heading text-xl font-bold">Ладошки</span>
              </div>
              <p className="text-sm text-gray-400">
                Онлайн-олимпиады для учеников начальной школы
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Олимпиады</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-lime-400 transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Расписание</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Демоверсии</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-lime-400 transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Документы</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Партнёры</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@ladoshki.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 123-45-67
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 Олимпиада Ладошки. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-lime-400 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-lime-400 transition-colors">Оферта</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
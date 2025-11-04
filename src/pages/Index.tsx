import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [userRole, setUserRole] = useState<'student' | 'parent' | 'teacher'>('student');
  const [showProfile, setShowProfile] = useState(false);
  const [showOlympiad, setShowOlympiad] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [olympiadComplete, setOlympiadComplete] = useState(false);

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

  const questions = [
    { q: 'Сколько будет 12 + 8?', options: ['18', '20', '22', '19'], correct: '20' },
    { q: 'Какое число больше: 45 или 54?', options: ['45', '54', 'Равны', 'Не определить'], correct: '54' },
    { q: 'У Маши было 15 конфет, она отдала 7. Сколько осталось?', options: ['7', '8', '9', '6'], correct: '8' },
    { q: 'Какая фигура имеет 3 стороны?', options: ['Квадрат', 'Треугольник', 'Круг', 'Прямоугольник'], correct: 'Треугольник' },
    { q: 'Сколько сантиметров в 1 метре?', options: ['10', '50', '100', '1000'], correct: '100' },
    { q: 'Чему равно 5 × 4?', options: ['15', '20', '25', '30'], correct: '20' },
    { q: 'Какое число является четным?', options: ['13', '17', '22', '25'], correct: '22' },
    { q: 'Сколько углов у квадрата?', options: ['3', '4', '5', '6'], correct: '4' },
    { q: 'Если сегодня понедельник, какой день будет через 3 дня?', options: ['Вторник', 'Среда', 'Четверг', 'Пятница'], correct: 'Четверг' },
    { q: 'Сколько будет 100 - 35?', options: ['55', '65', '75', '85'], correct: '65' },
  ];

  const userHistory = [
    { id: 1, subject: 'Математика', date: '10 октября 2025', score: 85, diploma: true },
    { id: 2, subject: 'Русский язык', date: '5 сентября 2025', score: 92, diploma: true },
    { id: 3, subject: 'Окружающий мир', date: '15 августа 2025', score: 78, diploma: true },
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

  useEffect(() => {
    if (showOlympiad && !olympiadComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showOlympiad, olympiadComplete, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    setAnswers([...answers, selectedAnswer]);
    setSelectedAnswer('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setOlympiadComplete(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, idx) => {
      if (answer === questions[idx].correct) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const startOlympiad = () => {
    setShowOlympiad(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer('');
    setTimeLeft(600);
    setOlympiadComplete(false);
  };

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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="text-4xl">👋</div>
            <span className="font-heading text-2xl font-bold text-lime-600">Ладошки</span>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-lime-600 transition-colors">О проекте</button>
            <button onClick={() => scrollToSection('participation')} className="text-sm font-medium hover:text-lime-600 transition-colors">Как принять участие</button>
            <button onClick={() => scrollToSection('awards')} className="text-sm font-medium hover:text-lime-600 transition-colors">Награды</button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-lime-600 transition-colors">Стоимость и оплата</button>
            <button onClick={() => scrollToSection('results')} className="text-sm font-medium hover:text-lime-600 transition-colors">Итоги</button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-lime-600 transition-colors">Контакты</button>
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowProfile(!showProfile)} variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
            <Button className="bg-lime-500 hover:bg-lime-600 text-white">
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
          </div>
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
              <Button size="lg" onClick={() => scrollToSection('olympiads')} className="bg-lime-500 hover:bg-lime-600 text-white text-lg px-8 hover:scale-105 transition-transform">
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

      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-6">О проекте</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              «Ладошки» — это образовательная платформа для проведения онлайн-олимпиад среди учеников начальной школы. 
              Мы создаём увлекательные задания, которые помогают детям развивать логику, внимание и творческое мышление.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-lime-50 rounded-2xl">
                <div className="text-4xl mb-3">🎓</div>
                <div className="text-3xl font-bold text-lime-600 mb-2">15,000+</div>
                <div className="text-sm text-gray-600">Участников ежемесячно</div>
              </div>
              <div className="p-6 bg-sky-50 rounded-2xl">
                <div className="text-4xl mb-3">📚</div>
                <div className="text-3xl font-bold text-sky-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Предметов и направлений</div>
              </div>
              <div className="p-6 bg-orange-50 rounded-2xl">
                <div className="text-4xl mb-3">🏆</div>
                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Довольных участников</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="participation" className="py-16 bg-gradient-to-b from-white to-lime-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Как принять участие</h2>
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

      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Стоимость и оплата</h2>
          <p className="text-center text-gray-600 mb-12">Все олимпиады полностью бесплатные</p>
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-lime-500">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-lime-500">Бесплатно</Badge>
                <CardTitle className="font-heading text-2xl">Участие в олимпиаде</CardTitle>
                <CardDescription>Всё необходимое для прохождения и получения наград</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-lime-500 mt-0.5" />
                  <span className="text-sm">Доступ ко всем заданиям</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-lime-500 mt-0.5" />
                  <span className="text-sm">Электронный диплом в PDF</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-lime-500 mt-0.5" />
                  <span className="text-sm">Результаты и статистика</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-lime-500 mt-0.5" />
                  <span className="text-sm">Личный кабинет участника</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-lime-500 mt-0.5" />
                  <span className="text-sm">Неограниченное количество попыток</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => scrollToSection('olympiads')} className="w-full bg-lime-500 hover:bg-lime-600 text-white">Начать бесплатно</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section id="awards" className="py-16 bg-gradient-to-b from-white to-lime-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Награды</h2>
          <p className="text-center text-gray-600 mb-12">Каждый участник получает награду за свои достижения</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="text-6xl mb-4">🥇</div>
                <CardTitle className="font-heading">Диплом I степени</CardTitle>
                <CardDescription>За результат 90-100 баллов</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Электронный диплом в высоком качестве PDF</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="text-6xl mb-4">🥈</div>
                <CardTitle className="font-heading">Диплом II степени</CardTitle>
                <CardDescription>За результат 75-89 баллов</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Электронный диплом с персональными данными</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="text-6xl mb-4">🥉</div>
                <CardTitle className="font-heading">Диплом III степени</CardTitle>
                <CardDescription>За результат 60-74 балла</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Электронный диплом участника олимпиады</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      <section id="olympiads" className="py-16 bg-white">
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
                  <Button 
                    className="flex-1 bg-lime-500 hover:bg-lime-600 text-white"
                    onClick={startOlympiad}
                    disabled={olympiad.status !== 'open'}
                  >
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

      <section id="results" className="py-16 bg-gradient-to-b from-white to-lime-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Итоги олимпиад</h2>
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
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-white">
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
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-gradient-to-b from-white to-lime-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Контакты</h2>
          <p className="text-center text-gray-600 mb-12">Свяжитесь с нами любым удобным способом</p>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Icon name="Mail" size={24} className="text-lime-500" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@ladoshki.ru" className="text-lime-600 hover:underline">info@ladoshki.ru</a>
                <p className="text-sm text-gray-600 mt-2">Ответим в течение 24 часов</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Icon name="Phone" size={24} className="text-lime-500" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+78001234567" className="text-lime-600 hover:underline">+7 (800) 123-45-67</a>
                <p className="text-sm text-gray-600 mt-2">Бесплатно по России, пн-пт 9:00-18:00</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} className="text-lime-500" />
                  Telegram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="#" className="text-lime-600 hover:underline">@ladoshki_support</a>
                <p className="text-sm text-gray-600 mt-2">Быстрая поддержка в мессенджере</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Icon name="MapPin" size={24} className="text-lime-500" />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">г. Москва, ул. Примерная, д. 123</p>
                <p className="text-sm text-gray-600 mt-2">Офис открыт пн-пт 10:00-17:00</p>
              </CardContent>
            </Card>
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
                <li><button onClick={() => scrollToSection('olympiads')} className="hover:text-lime-400 transition-colors">Каталог</button></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Расписание</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Демоверсии</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-lime-400 transition-colors">О проекте</button></li>
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

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl flex items-center gap-2">
              <Icon name="User" size={24} />
              Профиль участника
            </DialogTitle>
            <DialogDescription>Ваши результаты и достижения</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-lime-50 to-sky-50 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-lime-500 flex items-center justify-center text-white text-2xl font-bold">
                ИИ
              </div>
              <div>
                <div className="font-semibold text-lg">Иванов Иван</div>
                <div className="text-sm text-gray-600">3 класс • Москва</div>
                <Badge className="mt-1 bg-lime-500">Участник</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-lime-600">12</div>
                <div className="text-xs text-gray-600">Олимпиад</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-sky-600">85%</div>
                <div className="text-xs text-gray-600">Средний балл</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-xs text-gray-600">Дипломов</div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Icon name="History" size={20} />
                История участия
              </h3>
              <div className="space-y-3">
                {userHistory.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold">{item.subject}</div>
                          <div className="text-xs text-gray-600 flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={12} />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Target" size={12} />
                              {item.score} баллов
                            </span>
                          </div>
                        </div>
                        {item.diploma && (
                          <Button variant="outline" size="sm">
                            <Icon name="Download" size={14} className="mr-1" />
                            Диплом
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки профиля
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showOlympiad} onOpenChange={setShowOlympiad}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Олимпиада по математике</DialogTitle>
            <DialogDescription>3 класс • 10 вопросов • 10 минут</DialogDescription>
          </DialogHeader>
          
          {!olympiadComplete ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={20} className="text-lime-600" />
                  <span className="font-semibold">Осталось времени: {formatTime(timeLeft)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Вопрос {currentQuestion + 1} из {questions.length}
                </div>
              </div>
              
              <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{questions[currentQuestion].q}</h3>
                
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-lime-50 transition-colors">
                        <RadioGroupItem value={option} id={`option-${idx}`} />
                        <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleNextQuestion} 
                  disabled={!selectedAnswer}
                  className="flex-1 bg-lime-500 hover:bg-lime-600 text-white"
                >
                  {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center py-8">
              <div className="text-7xl">🎉</div>
              <div>
                <h3 className="text-3xl font-bold mb-2">Поздравляем!</h3>
                <p className="text-gray-600">Вы успешно завершили олимпиаду</p>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-lime-50 to-sky-50 rounded-2xl">
                <div className="text-6xl font-bold text-lime-600 mb-2">{calculateScore()}%</div>
                <div className="text-lg text-gray-600">Ваш результат</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">{answers.filter((a, i) => a === questions[i].correct).length}</div>
                  <div className="text-sm text-gray-600">Правильных ответов</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">{formatTime(600 - timeLeft)}</div>
                  <div className="text-sm text-gray-600">Затрачено времени</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                Результаты будут обработаны в течение 3-5 рабочих дней.<br />
                Диплом появится в вашем личном кабинете.
              </p>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowOlympiad(false)}>
                  Закрыть
                </Button>
                <Button className="flex-1 bg-lime-500 hover:bg-lime-600 text-white" onClick={() => setShowProfile(true)}>
                  <Icon name="User" size={18} className="mr-2" />
                  Перейти в профиль
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
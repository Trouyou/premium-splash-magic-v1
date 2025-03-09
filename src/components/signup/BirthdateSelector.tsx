import React, { useState, useEffect, useRef } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

// Mois en français
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

interface DateValue {
  day?: number;
  month?: number;
  year?: number;
}

interface BirthdateSelectorProps {
  onChange: (date: string | null) => void;
  onValidate: (isValid: boolean) => void;
  errorMessage?: string;
}

const BirthdateSelector = ({ onChange, onValidate, errorMessage }: BirthdateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<DateValue>({});
  const [displayDate, setDisplayDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear() - 20); // Par défaut à -20 ans
  const [isMobile, setIsMobile] = useState(false);
  
  const calendarRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  
  // Déterminer si l'appareil est mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Fermer le calendrier quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) && 
          dateInputRef.current && !dateInputRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Valider l'âge (18 ans minimum)
  const validateAge = (day?: number, month?: number, year?: number): boolean => {
    if (!day || !month || !year) {
      return false;
    }
    
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18;
  };
  
  // Mettre à jour la date et la validation
  const updateDate = (day?: number, month?: number, year?: number) => {
    const newSelectedDate = {
      day: day !== undefined ? day : selectedDate.day,
      month: month !== undefined ? month : selectedDate.month,
      year: year !== undefined ? year : selectedDate.year
    };
    
    setSelectedDate(newSelectedDate);
    
    // Vérifier si la date est complète
    if (newSelectedDate.day && newSelectedDate.month && newSelectedDate.year) {
      // Valider l'âge
      const isValid = validateAge(newSelectedDate.day, newSelectedDate.month, newSelectedDate.year);
      
      if (isValid) {
        // Formater la date pour l'affichage (JJ/MM/AAAA)
        const formattedDisplay = `${String(newSelectedDate.day).padStart(2, '0')}/${String(newSelectedDate.month).padStart(2, '0')}/${newSelectedDate.year}`;
        setDisplayDate(formattedDisplay);
        
        // Formater la date pour le stockage (YYYY-MM-DD)
        const formattedDate = `${newSelectedDate.year}-${String(newSelectedDate.month).padStart(2, '0')}-${String(newSelectedDate.day).padStart(2, '0')}`;
        onChange(formattedDate);
        setError(null);
      } else {
        setError('Vous devez avoir au moins 18 ans pour créer un compte');
        onChange(null);
      }
      
      onValidate(isValid);
    } else {
      // Date incomplète
      onChange(null);
      onValidate(false);
      if (newSelectedDate.day || newSelectedDate.month || newSelectedDate.year) {
        setError('Veuillez indiquer votre date de naissance complète');
      } else {
        setError(null);
      }
    }
  };
  
  // Parser une date saisie manuellement
  const parseInputDate = (input: string): DateValue | null => {
    // Accepter les formats: JJ/MM/AAAA, JJ-MM-AAAA, JJ.MM.AAAA
    const formats = [
      /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/, // JJ/MM/AAAA
      /^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/  // AAAA/MM/JJ
    ];
    
    for (const format of formats) {
      const match = input.match(format);
      if (match) {
        if (format === formats[0]) {
          // Format JJ/MM/AAAA
          return {
            day: parseInt(match[1], 10),
            month: parseInt(match[2], 10),
            year: parseInt(match[3], 10)
          };
        } else {
          // Format AAAA/MM/JJ
          return {
            year: parseInt(match[1], 10),
            month: parseInt(match[2], 10),
            day: parseInt(match[3], 10)
          };
        }
      }
    }
    
    return null;
  };
  
  // Gérer la saisie manuelle de la date
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Garder uniquement les chiffres
    
    if (value.length > 8) {
      value = value.substring(0, 8);
    }
    
    // Formater automatiquement avec des slashes
    if (value.length > 4) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(4)}`;
    } else if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    
    setDisplayDate(value);
  };
  
  // Valider la date saisie manuellement lors de la perte de focus
  const validateInputDate = () => {
    if (!displayDate.trim()) {
      setError('Veuillez indiquer votre date de naissance');
      onValidate(false);
      onChange(null);
      return;
    }
    
    const parsedDate = parseInputDate(displayDate);
    if (!parsedDate) {
      setError('Format de date invalide. Utilisez JJ/MM/AAAA');
      onValidate(false);
      onChange(null);
      return;
    }
    
    const { day, month, year } = parsedDate;
    
    // Vérifier si la date est valide
    if (!day || day < 1 || day > 31 || !month || month < 1 || month > 12 || !year || year < 1900 || year > new Date().getFullYear()) {
      setError('Date invalide');
      onValidate(false);
      onChange(null);
      return;
    }
    
    // Mettre à jour la date sélectionnée
    setSelectedDate({ day, month, year });
    
    // Valider l'âge
    const isValid = validateAge(day, month, year);
    if (isValid) {
      // Formater la date
      const formattedDisplay = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
      setDisplayDate(formattedDisplay);
      
      // Formater la date pour le stockage
      const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      onChange(formattedDate);
      setError(null);
    } else {
      setError('Vous devez avoir au moins 18 ans pour créer un compte');
      onChange(null);
    }
    
    onValidate(isValid);
  };
  
  // Générer les options pour les jours (1-31)
  const getDayOptions = () => {
    const options = [];
    
    options.push(
      <option key="day-placeholder" value="" disabled>Jour</option>
    );
    
    for (let i = 1; i <= 31; i++) {
      options.push(
        <option key={`day-${i}`} value={i}>{i}</option>
      );
    }
    
    return options;
  };
  
  // Générer les options pour les mois
  const getMonthOptions = () => {
    const options = [];
    
    options.push(
      <option key="month-placeholder" value="" disabled>Mois</option>
    );
    
    for (let i = 0; i < MONTHS.length; i++) {
      options.push(
        <option key={`month-${i+1}`} value={i+1}>{MONTHS[i]}</option>
      );
    }
    
    return options;
  };
  
  // Générer les options pour les années
  const getYearOptions = () => {
    const options = [];
    const thisYear = new Date().getFullYear();
    
    options.push(
      <option key="year-placeholder" value="" disabled>Année</option>
    );
    
    for (let i = thisYear; i >= thisYear - 100; i--) {
      options.push(
        <option key={`year-${i}`} value={i}>{i}</option>
      );
    }
    
    return options;
  };
  
  // Générer le calendrier
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Ajuster pour que la semaine commence le lundi (0 = Lundi, 6 = Dimanche)
    const startingDay = firstDay === 0 ? 6 : firstDay - 1;
    
    // Créer les jours du calendrier
    const days = [];
    
    // Jours de la semaine
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    weekDays.forEach((day, index) => {
      days.push(
        <div key={`weekday-${index}`} className="text-xs text-gray-500">{day}</div>
      );
    });
    
    // Espaces vides pour le début du mois
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }
    
    // Jours du mois
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentYear, currentMonth, i);
      const isSelectable = dayDate <= eighteenYearsAgo;
      
      days.push(
        <div 
          key={`day-${i}`}
          className={`p-2 text-center ${isSelectable ? 'cursor-pointer hover:bg-gray-100 rounded' : 'text-gray-400 cursor-not-allowed'}`}
          onClick={() => {
            if (isSelectable) {
              updateDate(i, currentMonth + 1, currentYear);
              setCalendarOpen(false);
            }
          }}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };
  
  // Navigation dans le calendrier
  const changeMonth = (delta: number) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };
  
  // Changer l'année du calendrier
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value));
  };
  
  // Rendu du composant
  return (
    <div className="birthdate-container w-full mb-4">
      {isMobile ? (
        // Vue mobile : sélecteurs déroulants
        <div className="date-selector-wrapper relative w-full">
          <div className="date-selector flex relative w-full border border-gray-300 rounded-lg overflow-hidden">
            {/* Jour */}
            <select
              id="day-select"
              value={selectedDate.day || ""}
              onChange={(e) => updateDate(parseInt(e.target.value) || undefined, selectedDate.month, selectedDate.year)}
              className="date-select flex-1 p-3 appearance-none border-none bg-white font-avantgarde text-[#333333] cursor-pointer outline-none w-1/3"
              aria-label="Jour"
            >
              {getDayOptions()}
            </select>
            
            {/* Mois */}
            <select
              id="month-select"
              value={selectedDate.month || ""}
              onChange={(e) => updateDate(selectedDate.day, parseInt(e.target.value) || undefined, selectedDate.year)}
              className="date-select flex-1 p-3 appearance-none border-none border-l border-r border-gray-300 bg-white font-avantgarde text-[#333333] cursor-pointer outline-none w-1/3"
              aria-label="Mois"
            >
              {getMonthOptions()}
            </select>
            
            {/* Année */}
            <select
              id="year-select"
              value={selectedDate.year || ""}
              onChange={(e) => updateDate(selectedDate.day, selectedDate.month, parseInt(e.target.value) || undefined)}
              className="date-select flex-1 p-3 appearance-none border-none bg-white font-avantgarde text-[#333333] cursor-pointer outline-none w-1/3"
              aria-label="Année"
            >
              {getYearOptions()}
            </select>
          </div>
          
          {/* Icônes de flèche déroulante */}
          <div className="select-arrows absolute top-0 right-0 bottom-0 w-full pointer-events-none">
            <div className="absolute top-1/2 right-2.5 transform -translate-y-1/2 w-2.5 h-1.5 opacity-30">
              <ChevronRight size={10} className="-rotate-90" />
            </div>
            <div className="absolute top-1/2 right-[calc(33.33%+0.625rem)] transform -translate-y-1/2 w-2.5 h-1.5 opacity-30">
              <ChevronRight size={10} className="-rotate-90" />
            </div>
            <div className="absolute top-1/2 right-[calc(66.66%+0.625rem)] transform -translate-y-1/2 w-2.5 h-1.5 opacity-30">
              <ChevronRight size={10} className="-rotate-90" />
            </div>
          </div>
        </div>
      ) : (
        // Vue desktop : champ avec mini-calendrier
        <div className="date-input-wrapper relative w-full">
          <div className="date-input-container relative w-full">
            <input 
              ref={dateInputRef}
              type="text" 
              id="date-input" 
              value={displayDate}
              onChange={handleInputChange}
              onBlur={validateInputDate}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  validateInputDate();
                }
              }}
              placeholder="JJ/MM/AAAA" 
              autoComplete="off"
              className={`w-full p-3 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg font-avantgarde text-[#333333] outline-none transition-all focus:ring-2 focus:ring-eatly-primary/20 focus:border-eatly-primary`}
            />
            <div 
              className="calendar-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={() => setCalendarOpen(!calendarOpen)}
            >
              <CalendarIcon size={20} />
            </div>
          </div>
          
          {/* Mini-calendrier */}
          {calendarOpen && (
            <div 
              ref={calendarRef}
              id="mini-calendar" 
              className="absolute top-[calc(100%+5px)] left-0 w-[300px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3"
            >
              <div className="calendar-header flex justify-between items-center mb-3">
                <button 
                  type="button" 
                  id="prev-month" 
                  onClick={() => changeMonth(-1)}
                  className="bg-transparent border-none cursor-pointer p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft size={16} />
                </button>
                <div id="current-month-year" className="font-avantgarde font-medium">
                  {MONTHS[currentMonth]} {currentYear}
                </div>
                <button 
                  type="button" 
                  id="next-month" 
                  onClick={() => changeMonth(1)}
                  className="bg-transparent border-none cursor-pointer p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="calendar-days grid grid-cols-7 gap-1 text-center">
                {generateCalendar()}
              </div>
              <div className="year-selector mt-3 text-center">
                <select 
                  id="calendar-year-select" 
                  value={currentYear}
                  onChange={handleYearChange}
                  className="p-1 border border-gray-300 rounded font-avantgarde text-sm"
                >
                  {getYearOptions().slice(1)} {/* Ignorer l'option "Année" */}
                </select>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Message d'erreur */}
      {(error || errorMessage) && (
        <div id="birthdate-error" className="error-message text-eatly-primary text-xs mt-1 font-avantgarde">
          {error || errorMessage}
        </div>
      )}
    </div>
  );
};

export default BirthdateSelector;

import colors from './colors';

export type ServiceKey =
  | 'BabySitter'
  | 'HouseMaid'
  | 'Cook'
  | 'OfficeBoy'
  | 'Helper'
  | 'Nanny'
  | 'JapaMaid'
  | 'Driver'
  | 'ElderlyCare'
  | 'PatientCare'
  | 'CookHelper'
  | 'HomeTuition'
  | 'Staff_Restaurant';

export interface Service {
  key: ServiceKey;
  label: string;
  labelHi?: string;
  desc: string;
  descHi?: string;
  emoji: string;
  imageUrl: string;
  bgColor: string;
}

export const SERVICES: Service[] = [
  { 
    key: 'BabySitter',       
    label: 'Baby Sitter',      
    labelHi: 'बेबी सिटर',        
    desc: 'Loving & experienced infant & child care',       
    descHi: 'शिशु व बच्चों की अनुभवी देखभाल',       
    emoji: '👶', 
    imageUrl: 'https://www.anydomestichelp.com/images/3.jpeg',
    bgColor: colors.serviceBg1 
  },
  { 
    key: 'HouseMaid',        
    label: 'House Maid',       
    labelHi: 'हाउस मेड',         
    desc: 'Daily house cleaning, dusting & chores',        
    descHi: 'घर की दैनिक साफ-सफाई व व्यवस्था',      
    emoji: '🏠', 
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg2 
  },
  { 
    key: 'Cook',             
    label: 'Cook',             
    labelHi: 'कुक / रसोइया',     
    desc: 'Fresh, delicious & hygienic daily meals',       
    descHi: 'ताजा, स्वादिष्ट व पौष्टिक भोजन',        
    emoji: '🍳', 
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg3 
  },
  { 
    key: 'OfficeBoy',        
    label: 'Office Boy',       
    labelHi: 'ऑफिस बॉय',         
    desc: 'Office support, pantry & document tasks',       
    descHi: 'कार्यालय कार्य व पैंट्री सहायता',        
    emoji: '📦', 
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg4 
  },
  { 
    key: 'Helper',           
    label: 'Helper',           
    labelHi: 'हेल्पर',           
    desc: 'Reliable hand for household assistance',        
    descHi: 'घरेलू कार्यों में मददगार हाथ',          
    emoji: '🧰', 
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg5 
  },
  { 
    key: 'Nanny',            
    label: 'Nanny',            
    labelHi: 'नैनी',             
    desc: 'Attentive, full-day childcare & growth',        
    descHi: 'बच्चों की पूरी देखभाल व देखरेख',       
    emoji: '🤱', 
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg1 
  },
  { 
    key: 'JapaMaid',         
    label: 'Japa Maid',        
    labelHi: 'जापा मेड',         
    desc: 'Postpartum mother & newborn baby specialist',   
    descHi: 'प्रसूति व नवजात शिशु की विशेष देखभाल',   
    emoji: '🧽', 
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg2 
  },
  { 
    key: 'Driver',           
    label: 'Driver',           
    labelHi: 'ड्राइवर',          
    desc: 'Verified personal & commercial chauffeurs',     
    descHi: 'सत्यापित व कुशल पर्सनल ड्राइवर',       
    emoji: '🚗', 
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg3 
  },
  { 
    key: 'ElderlyCare',      
    label: 'Elderly Care',     
    labelHi: 'बुजुर्गों की देखभाल', 
    desc: 'Compassionate senior citizen daily support',   
    descHi: 'बुजुर्गों की समर्पित सेवा व देखभाल',     
    emoji: '🧓', 
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg4 
  },
  { 
    key: 'PatientCare',      
    label: 'Patient Care',     
    labelHi: 'मरीज की देखभाल',     
    desc: 'Trained medical & bedside care assistance',     
    descHi: 'मरीजों की विशेष देखरेख व देखभाल',       
    emoji: '🩺', 
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg5 
  },
  { 
    key: 'CookHelper',       
    label: 'Cook / Helper',    
    labelHi: 'कुक / हेल्पर',     
    desc: 'Dual kitchen cooking & house help',             
    descHi: 'रसोई व घरेलू कार्य का दोहरा सहयोग',    
    emoji: '🍳', 
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg1 
  },
  { 
    key: 'HomeTuition',      
    label: 'Home Tuition',     
    labelHi: 'होम ट्यूशन',       
    desc: 'Qualified tutors for all school subjects',      
    descHi: 'सभी विषयों के योग्य होम ट्यूटर',       
    emoji: '📚', 
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg2 
  },
  { 
    key: 'Staff_Restaurant', 
    label: 'Restaurant Staff', 
    labelHi: 'रेस्टोरेंट स्टाफ',  
    desc: 'Trained staff for cafes, hotels & dining',      
    descHi: 'होटल व कैफे के प्रशिक्षित स्टाफ',      
    emoji: '🍽️', 
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=85',
    bgColor: colors.serviceBg3 
  },
];

export const CAROUSEL_SERVICES: ServiceKey[] = [
  'BabySitter',
  'Cook',
  'HouseMaid',
];

export const CAROUSEL_IMAGES: Record<string, { label: string; image: string }> = {
  BabySitter: { label: 'BABYSITTER', image: 'https://www.anydomestichelp.com/images/3.jpeg' },
  Cook:       { label: 'COOK',       image: 'https://www.anydomestichelp.com/images/1.jpeg' },
  HouseMaid:  { label: 'HOUSEMAID',  image: 'https://www.anydomestichelp.com/images/2.jpeg' },
};

export const WORKING_HOURS = [
  { label: 'Part Time 4 Hrs',           value: 'Part Time 4 Hrs' },
  { label: 'Part Time 8 Hrs',           value: 'Full Time 8 Hrs' },
  { label: 'Part Time 10 Hrs',          value: 'Full Time 10 Hrs' },
  { label: 'Full Time 24 Hrs (Live In)', value: '24 Hrs Live In' },
];

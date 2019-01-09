import i18next from 'i18next';

i18next.init({
  interpolation: {
    // React already does escaping
    escapeValue: false
  },
  lng: 'en', // 'en' | 'es'
  // Using simple hardcoded resources for simple example
  resources: {
    en: {
      translation: {
        'Welcome': 'Welcome',
        age: { label: 'Age' },
        home: { label: 'Home' },
        name: { label: 'Name' }
      }
    },
    es: {
      translation: {
        'Welcome': 'Hola',
        age: { label: 'Años' },
        home: { label: 'Casa' },
        name: { label: 'Nombre' }
      }
    }
  }
});

export default i18next;

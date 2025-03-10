import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Users, Sparkles, ArrowRight, Award, Rocket, LightbulbIcon, UserCircle2, BookOpen } from 'lucide-react';
import { WaveDivider } from '../components/WaveDivider';

// Feature step background images
const FEATURE_IMAGES = [
  "/src/assets/images/img1.png",
  "/src/assets/images/img2.png",
  "/src/assets/images/img3.png"
];

function FeatureStep({ 
  stepNumber,
  title, 
  description, 
  icon: Icon,
  iconColor = "text-blue-500",
  imageIndex = 0
}: { 
  stepNumber: number,
  title: string, 
  description: string, 
  icon: React.ElementType,
  iconColor?: string,
  imageIndex?: number
}) {
  const backgroundImage = FEATURE_IMAGES[imageIndex % FEATURE_IMAGES.length];
  
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Background image */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img 
          src={backgroundImage} 
          alt="" 
          className="w-3/4 h-auto object-contain"
        />
      </div>
      
      {/* Icon with colored background */}
      <div className={`mb-6 ${iconColor} relative z-10`}>
        <Icon className="w-16 h-16 stroke-[1.5]" />
      </div>
      
      {/* Step number */}
      <div className="mb-2 relative z-10">
        <span className="text-lg font-medium text-blue-500">Step {stepNumber}:</span>
      </div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold mb-3 text-gray-800 relative z-10">{title}</h3>
      
      {/* Description */}
      <p className="text-gray-600 max-w-xs mx-auto relative z-10">{description}</p>
    </div>
  );
}

function StatItem({ 
  icon: Icon, 
  number, 
  label,
  imageIndex = 0
}: { 
  icon: React.ElementType, 
  number: string, 
  label: string,
  imageIndex?: number
}) {
  const backgroundImage = FEATURE_IMAGES[imageIndex % FEATURE_IMAGES.length];
  
  return (
    <div className="flex flex-col items-center text-center relative py-8">
      {/* Background image */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img 
          src={backgroundImage} 
          alt="" 
          className="w-3/4 h-auto object-contain"
        />
      </div>
      
      {/* Icon */}
      <div className="relative mb-4 text-blue-500 z-10">
        <Icon className="w-14 h-14 stroke-[1.5]" />
      </div>
      
      {/* Number */}
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 relative z-10">
        {number}
      </div>
      
      {/* Label */}
      <div className="text-gray-600 font-medium relative z-10">{label}</div>
    </div>
  );
}

export function LandingPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add a class to the body for page entrance animation
    document.body.classList.add('animate-fade-in');
    
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Modern Header with Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-blue-100 overflow-hidden shadow-lg">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/10 z-0"></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-100/30 rounded-bl-[150px] -z-0"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-300/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side - Text content */}
            <div className="md:w-1/2 mb-10 md:mb-0 text-left z-10 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-sm">
                <span className="block">Bildungserlebnis 4.0</span>
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Die Zukunft des Lernens</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Erleben Sie moderne Bildung mit KI-unterstützten Features und innovativen Lernkonzepten für bessere Lernergebnisse.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg flex items-center gap-2 group"
                >
                  <span>Zum Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="px-8 py-3 bg-white/80 backdrop-blur-sm text-blue-600 border border-blue-200 rounded-full text-lg font-semibold hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  Mehr erfahren
                </button>
              </div>
            </div>
            
            {/* Right side - Image with enhanced transparency */}
            <div className="md:w-1/2 flex justify-center md:justify-end relative z-10 animate-slide-up">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/30 rounded-full blur-xl"></div>
                <img 
                  src="/src/assets/images/img4.png" 
                  alt="Bildungserlebnis Illustration" 
                  className="max-w-full md:max-w-lg h-auto object-contain relative z-10 drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <WaveDivider className="text-white" variant="gentle" />
        </div>
      </header>

      {/* Features Section - Redesigned to be similar to the example */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-medium uppercase tracking-wider">SO FUNKTIONIERT ES</span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Nahtlose Implementierung</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <FeatureStep 
              stepNumber={1}
              icon={LightbulbIcon}
              iconColor="text-blue-500"
              title="Kursmanagement"
              description="Erstellen und bearbeiten Sie Kurse mit einer intuitiven Benutzeroberfläche."
              imageIndex={0}
            />
            
            <FeatureStep 
              stepNumber={2}
              icon={UserCircle2}
              iconColor="text-amber-500"
              title="Modulbearbeitung"
              description="Verwalten Sie Lerneinheiten mit flexibler Modulstruktur."
              imageIndex={1}
            />
            
            <FeatureStep 
              stepNumber={3}
              icon={BookOpen}
              iconColor="text-orange-500"
              title="KI-Werkzeuge"
              description="Nutzen Sie intelligente Empfehlungen und Analysen für bessere Lernergebnisse."
              imageIndex={2}
            />
          </div>
        </div>
      </section>

      {/* Statistics Section - Redesigned to match the feature steps style */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-medium uppercase tracking-wider">UNSERE ERFOLGE</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Gemeinsam gestalten wir die Bildung von morgen</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <StatItem icon={Target} number="100%" label="Erfolgsquote" imageIndex={0} />
          <StatItem icon={Users} number="1000+" label="Aktive Nutzer" imageIndex={1} />
          <StatItem icon={Award} number="50+" label="Auszeichnungen" imageIndex={2} />
          <StatItem icon={Sparkles} number="24/7" label="Support" imageIndex={0} />
        </div>
      </section>

      {/* Innovation Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-1000"></div>
          <WaveDivider className="text-white/20" variant="gentle" />
          <div className="px-8 py-16 text-white relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 animate-pulse-slow">Innovation trifft Bildung</h2>
              <p className="text-xl mb-8">
                Entdecken Sie die Möglichkeiten von Bildungserlebnis 4.0 und gestalten Sie 
                die Zukunft des Lernens mit modernster Technologie.
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 mx-auto group hover:shadow-lg hover:shadow-blue-500/30 relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
                <Rocket className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="relative z-10">Jetzt starten</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute right-0 w-12 h-full bg-blue-100/30 skew-x-12 -translate-x-36 group-hover:translate-x-36 transition-transform duration-700"></span>
              </button>
            </div>
          </div>
          <WaveDivider className="text-white/20" variant="gentle" flip={true} />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white mt-16">
        <WaveDivider className="text-blue-50" flip={true} />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="mb-2 hover:text-blue-200 transition-colors duration-300 inline-block">Kontakt: <a href="mailto:admin@bildungserlebnis.de" className="underline hover:no-underline">admin@bildungserlebnis.de</a></p>
          <p> 2024 Bildungserlebnis 4.0</p>
        </div>
      </footer>
    </div>
  );
}
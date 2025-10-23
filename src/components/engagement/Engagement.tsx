import { useState } from 'react';
import { Trophy, Award, Gamepad2, Star, Gift } from 'lucide-react';
import UserLevels from './UserLevels.tsx';
import Minigames from './Minigames.tsx';
import InteractionRewards from './InteractionRewards.tsx';
import Missions from './Missions.tsx';
import RewardEcosystem from './RewardEcosystem.tsx';

type TabType = 'levels' | 'minigames' | 'interactions' | 'missions' | 'ecosystem';

export default function Engagement() {
  const [activeTab, setActiveTab] = useState<TabType>('levels');

  const tabs = [
    { id: 'levels' as TabType, name: 'Niveles de Usuario', icon: Trophy },
    { id: 'minigames' as TabType, name: 'Minijuegos', icon: Gamepad2 },
    { id: 'interactions' as TabType, name: 'Recompensas por Interacciones', icon: Star },
    { id: 'missions' as TabType, name: 'Misiones y Desafíos', icon: Award },
    { id: 'ecosystem' as TabType, name: 'Ecosistema de Canje', icon: Gift },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'levels':
        return <UserLevels />;
      case 'minigames':
        return <Minigames />;
      case 'interactions':
        return <InteractionRewards />;
      case 'missions':
        return <Missions />;
      case 'ecosystem':
        return <RewardEcosystem />;
      default:
        return <UserLevels />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Engagement - Gamificación</h1>
          <p className="mt-2 text-sm text-gray-600">
            Configuración y visualización del módulo de gamificación
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon
                  className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${activeTab === tab.id ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

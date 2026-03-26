import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProjectInfo {
  name: string;
  description: string;
  investigator: string;
  department: string;
  date: string;
}

export interface Asset {
  id: string;
  name: string;
  isCustom?: boolean;
}

export interface Threat {
  id: string;
  name: string;
  description?: string;
}

export interface ThreatEvaluation {
  threatId: string;
  probability: number; 
  impact: number;      
}

export interface ThreatTreatment {
  threatId: string;
  status: 'Pendiente' | 'En proceso' | 'Implementada';
}

interface EvaluationState {
  projectInfo: ProjectInfo;
  assets: Asset[];
  selectedThreats: Threat[];
  evaluations: Record<string, ThreatEvaluation>; 
  treatments: Record<string, ThreatTreatment>;   
  
  setProjectInfo: (info: ProjectInfo) => void;
  addAsset: (asset: Asset) => void;
  removeAsset: (id: string) => void;
  toggleThreat: (threat: Threat) => void;
  setEvaluation: (threatId: string, probability: number, impact: number) => void;
  setTreatment: (threatId: string, status: ThreatTreatment['status']) => void;
  
  reset: () => void;
}

const defaultProjectInfo: ProjectInfo = {
  name: '',
  description: '',
  investigator: '',
  department: '',
  date: new Date().toISOString().split('T')[0],
}

export const useEvaluationStore = create<EvaluationState>()(
  persist(
    (set) => ({
      projectInfo: defaultProjectInfo,
      assets: [],
      selectedThreats: [],
      evaluations: {},
      treatments: {},
      
      setProjectInfo: (info) => set({ projectInfo: info }),
      addAsset: (asset) => set((state) => {
        if (state.assets.find(a => a.id === asset.id)) return state;
        return { assets: [...state.assets, asset] };
      }),
      removeAsset: (id) => set((state) => ({ assets: state.assets.filter(a => a.id !== id) })),
      
      toggleThreat: (threat) => set((state) => {
        const exists = state.selectedThreats.find(t => t.id === threat.id);
        if (exists) return { selectedThreats: state.selectedThreats.filter(t => t.id !== threat.id) };
        return { selectedThreats: [...state.selectedThreats, threat] };
      }),
      
      setEvaluation: (threatId, probability, impact) => set((state) => ({
        evaluations: { ...state.evaluations, [threatId]: { threatId, probability, impact } }
      })),
      
      setTreatment: (threatId, status) => set((state) => ({
        treatments: { ...state.treatments, [threatId]: { threatId, status } }
      })),
      
      reset: () => set({
        projectInfo: defaultProjectInfo,
        assets: [],
        selectedThreats: [],
        evaluations: {},
        treatments: {}
      }),
    }),
    {
      name: 'siari-evaluation-storage',
    }
  )
)

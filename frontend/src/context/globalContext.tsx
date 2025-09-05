import {
  createContext,
  useState,
  useContext,
} from 'react';
import type { ReactNode } from 'react';

type RecordState = {
  open: boolean
  tableName: string
}

interface GlobeContextType {
    isAddingRecord : RecordState
    isAddingTable : boolean
    setAddingRecord: React.Dispatch<React.SetStateAction<RecordState>>
    setAddingTable: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobeContext = createContext<GlobeContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: AuthProviderProps) {
    const [isAddingRecord, setAddingRecord] = useState<RecordState>({open:false, tableName:""})
    const [isAddingTable, setAddingTable] = useState(false)

  return (
    <GlobeContext.Provider value={{ isAddingRecord, isAddingTable, setAddingRecord, setAddingTable }}>
      {children}
    </GlobeContext.Provider>
  );
}

export function useGlobalData() {
  const context = useContext(GlobeContext);
  if (context === undefined) {
    throw new Error('useGlobeData must be used within an GlobeDataProvider');
  }
  return context;
}
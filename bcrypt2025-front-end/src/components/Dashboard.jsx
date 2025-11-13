import React, { useState, useEffect } from 'react';
import { Plus, LogOut, Loader, MessageSquare, Trash2 } from 'lucide-react';
import ChatService from '../services/ChatService';
import ChatWindow from './ChatWindow';
import { useAuth } from '../context/AuthContext';

const Dashboard = ({ navigateTo }) => {
  const { user, logout } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [activeSessionName, setActiveSessionName] = useState('');
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  // Cargar sesiones al montar
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await ChatService.getSessions();
      setSessions(data || []);
    } catch (err) {
      setError('Error al cargar sesiones: ' + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSession = async () => {
    setIsCreatingSession(true);
    setError('');

    try {
      const newSession = await ChatService.createSession();
      setSessions([...sessions, newSession]);
      setActiveSessionId(newSession.sessionId);
      setActiveSessionName(newSession.titulo || `Chat ${new Date().toLocaleDateString()}`);
    } catch (err) {
      setError('Error al crear sesión: ' + err.message);
      console.error(err);
    } finally {
      setIsCreatingSession(false);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('¿Estás seguro de que deseas cerrar esta sesión?')) {
      setError('');
      try {
        await ChatService.closeSession(sessionId);
        setSessions(sessions.filter(s => s.sessionId !== sessionId));
        if (activeSessionId === sessionId) {
          setActiveSessionId(null);
        }
      } catch (err) {
        setError('Error al cerrar sesión: ' + err.message);
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigateTo('login');
  };

  const handleCloseChat = () => {
    setActiveSessionId(null);
    setActiveSessionName('');
  };

  // Si hay una sesión activa, mostrar el chat
  if (activeSessionId) {
    return (
      <ChatWindow
        sessionId={activeSessionId}
        sessionName={activeSessionName}
        onClose={handleCloseChat}
      />
    );
  }

  // Dashboard de sesiones
  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">AlphaBrein Chat</h1>
            <p className="text-gray-400 text-sm">Bienvenido, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Crear nueva sesión */}
        <div className="bg-black rounded-lg border border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Nueva Sesión de Chat</h2>
          <button
            onClick={handleCreateSession}
            disabled={isCreatingSession}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
          >
            {isCreatingSession ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Plus size={18} />
            )}
            {isCreatingSession ? 'Creando...' : 'Crear Nueva Sesión'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 rounded mb-6">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Lista de sesiones */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Mis Sesiones</h2>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader className="animate-spin text-blue-500" size={32} />
            </div>
          ) : sessions.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
              <p>No hay sesiones todavía. ¡Crea una para comenzar!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map((session) => (
                <div
                  key={session.sessionId}
                  className="bg-black border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer group"
                >
                  <button
                    onClick={() => {
                      setActiveSessionId(session.sessionId);
                      setActiveSessionName(
                        session.titulo || `Chat ${new Date(session.createdAt).toLocaleDateString()}`
                      );
                    }}
                    className="w-full text-left mb-3"
                  >
                    <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition">
                      {session.titulo || `Chat ${new Date(session.createdAt).toLocaleDateString()}`}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </button>

                  <div className="flex gap-2 pt-3 border-t border-gray-700">
                    <button
                      onClick={() => {
                        setActiveSessionId(session.sessionId);
                        setActiveSessionName(
                          session.titulo || `Chat ${new Date(session.createdAt).toLocaleDateString()}`
                        );
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition"
                    >
                      Abrir
                    </button>
                    <button
                      onClick={() => handleDeleteSession(session.sessionId)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition"
                      title="Cerrar sesión"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
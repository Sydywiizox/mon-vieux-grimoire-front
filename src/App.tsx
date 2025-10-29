import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import BookDetailPage from "./pages/BookDetailPage";
import EditBookPage from "./pages/EditBookPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewBookPage from "./pages/NewBookPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-[#f4e3ce]">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/books/new"
                element={
                  <ProtectedRoute>
                    <NewBookPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route
                path="/books/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditBookPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fff",
                color: "#374151",
                borderRadius: "8px",
                padding: "12px 16px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              },
              success: {
                iconTheme: {
                  primary: "#f59e0b",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

// Función para registrar un nuevo usuario (Ej. Administrador creando cuentas para empleados)
export const registrarUsuario = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { exito: true, usuario: userCredential.user };
  } catch (error) {
    console.error("Error en registro:", error.message);
    return { exito: false, error: error.message };
  }
};

// Función para iniciar sesión
export const iniciarSesion = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { exito: true, usuario: userCredential.user };
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return { exito: false, error: error.message };
  }
};

// Función para cerrar sesión
export const cerrarSesion = async () => {
  try {
    await signOut(auth);
    return { exito: true };
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
    return { exito: false, error: error.message };
  }
};

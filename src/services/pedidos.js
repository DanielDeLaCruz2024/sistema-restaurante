import { onValue, push, ref, set, update } from "firebase/database";
import { database } from "../config/firebase";

// 1. Función para que Leonel (Móvil) envíe el pedido
export const crearPedido = async (numeroMesa, detalles) => {
  try {
    const pedidosRef = ref(database, "pedidos");
    const nuevoPedidoRef = push(pedidosRef); // Genera un ID único
    await set(nuevoPedidoRef, {
      mesa: numeroMesa,
      detalles: detalles,
      estado: "pendiente", // Los estados serán: pendiente -> preparando -> listo
      timestamp: Date.now(),
    });
    return true;
  } catch (error) {
    console.error("Error guardando el pedido:", error);
    return false;
  }
};

// 2. Función para que Ruth (Web) reciba los pedidos en tiempo real
export const escucharPedidos = (callback) => {
  const pedidosRef = ref(database, "pedidos");

  // onValue se ejecuta automáticamente cada vez que hay un cambio en la base de datos
  onValue(pedidosRef, (snapshot) => {
    const datos = snapshot.val();
    // Convertimos el objeto de Firebase a un Arreglo (Array) para que React lo lea fácil
    const listaPedidos = datos
      ? Object.keys(datos).map((key) => ({
          id: key,
          ...datos[key],
        }))
      : [];

    // Ordenamos para que los pedidos más viejos salgan primero
    listaPedidos.sort((a, b) => a.timestamp - b.timestamp);

    callback(listaPedidos);
  });
};

// 3. Función para que Cocina cambie el estado del pedido (Ej. de 'pendiente' a 'listo')
export const actualizarEstadoPedido = async (idPedido, nuevoEstado) => {
  try {
    const pedidoRef = ref(database, `pedidos/${idPedido}`);
    await update(pedidoRef, { estado: nuevoEstado });
  } catch (error) {
    console.error("Error actualizando estado:", error);
  }
};

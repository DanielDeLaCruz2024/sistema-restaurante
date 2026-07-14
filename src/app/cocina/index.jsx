import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    actualizarEstadoPedido,
    escucharPedidos,
} from "../../services/pedidos";

export default function CocinaScreen() {
  const [pedidos, setPedidos] = useState([]);

  // Efecto para escuchar los pedidos en tiempo real cuando carga la pantalla
  useEffect(() => {
    escucharPedidos((datos) => {
      setPedidos(datos);
    });
  }, []);

  // Función para mover el pedido a la siguiente fase
  const avanzarEstado = (id, estadoActual) => {
    let nuevoEstado = "";
    if (estadoActual === "pendiente") nuevoEstado = "preparando";
    else if (estadoActual === "preparando") nuevoEstado = "listo";

    if (nuevoEstado) {
      actualizarEstadoPedido(id, nuevoEstado);
    }
  };

  // Filtrado de pedidos por estado para cada columna
  const pedidosPendientes = pedidos.filter((p) => p.estado === "pendiente");
  const pedidosPreparando = pedidos.filter((p) => p.estado === "preparando");
  const pedidosListos = pedidos.filter((p) => p.estado === "listo");

  // Componente interno para dibujar cada tarjeta de pedido
  const TarjetaPedido = ({ pedido, color, textoBoton }) => (
    <View style={[styles.tarjeta, { borderLeftColor: color }]}>
      <Text style={styles.textoMesa}>Mesa: {pedido.mesa}</Text>
      <Text style={styles.textoDetalle}>{pedido.detalles}</Text>

      {textoBoton && (
        <TouchableOpacity
          style={[styles.boton, { backgroundColor: color }]}
          onPress={() => avanzarEstado(pedido.id, pedido.estado)}
        >
          <Text style={styles.textoBoton}>{textoBoton}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tablero de Cocina (Kanban)</Text>

      <View style={styles.tablero}>
        {/* Columna: Pendientes */}
        <View style={styles.columna}>
          <Text style={styles.tituloColumna}>
            Pendientes ({pedidosPendientes.length})
          </Text>
          <ScrollView>
            {pedidosPendientes.map((pedido) => (
              <TarjetaPedido
                key={pedido.id}
                pedido={pedido}
                color="#FF6347" // Rojo - Tomate
                textoBoton="Iniciar Preparación"
              />
            ))}
          </ScrollView>
        </View>

        {/* Columna: En Preparación */}
        <View style={styles.columna}>
          <Text style={styles.tituloColumna}>
            En Preparación ({pedidosPreparando.length})
          </Text>
          <ScrollView>
            {pedidosPreparando.map((pedido) => (
              <TarjetaPedido
                key={pedido.id}
                pedido={pedido}
                color="#FFA500" // Naranja
                textoBoton="Marcar como Listo"
              />
            ))}
          </ScrollView>
        </View>

        {/* Columna: Listos */}
        <View style={styles.columna}>
          <Text style={styles.tituloColumna}>
            Listos ({pedidosListos.length})
          </Text>
          <ScrollView>
            {pedidosListos.map((pedido) => (
              <TarjetaPedido
                key={pedido.id}
                pedido={pedido}
                color="#32CD32" // Verde
                textoBoton={null}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  tablero: {
    flex: 1,
    flexDirection: "row", // Esto crea el efecto Kanban alineando columnas horizontalmente
    gap: 20,
  },
  columna: {
    flex: 1,
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    padding: 10,
  },
  tituloColumna: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#444",
  },
  tarjeta: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textoMesa: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textoDetalle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  boton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

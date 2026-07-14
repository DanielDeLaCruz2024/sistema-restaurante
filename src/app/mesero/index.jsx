import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { crearPedido } from "../../services/pedidos";

export default function MeseroScreen() {
  const [mesa, setMesa] = useState("");
  const [detalles, setDetalles] = useState("");

  const manejarEnvio = async () => {
    if (!mesa || !detalles) {
      alert("Por favor, ingresa la mesa y el pedido.");
      return;
    }

    // Llamamos a la función que tú creaste en servicios
    const exito = await crearPedido(mesa, detalles);

    if (exito) {
      alert(`¡Orden enviada a cocina para la mesa ${mesa}!`);
      setMesa(""); // Limpiamos el formulario
      setDetalles("");
    } else {
      alert("Hubo un error al enviar la orden.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Toma de Pedidos</Text>

      <Text style={styles.label}>Número de Mesa:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={mesa}
        onChangeText={setMesa}
        placeholder="Ej. 4"
      />

      <Text style={styles.label}>Detalle del Pedido:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={detalles}
        onChangeText={setDetalles}
        placeholder="Ej. 2 Tacos al pastor, 1 Coca Cola"
      />

      <TouchableOpacity style={styles.boton} onPress={manejarEnvio}>
        <Text style={styles.textoBoton}>Enviar a Cocina</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos básicos para que se vea presentable desde el primer minuto
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "600", color: "#555" },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: { height: 100, textAlignVertical: "top" },
  boton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBoton: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

const { titleCase, getHourGreeting, getCourtesy, buildGreeting } = require("./funcionesSaludador");

// 🔹 Función auxiliar para simular la hora en los tests
//   Así evitamos que dependa de la hora real de la computadora
const mockDate = (hour) => {
  const RealDate = Date;
  global.Date = class extends RealDate {
    constructor() {
      return new RealDate(`2020-01-01T${hour}:00:00`);
    }
  };
};

// -----------------------------
// PRUEBAS PARA titleCase
// -----------------------------
describe("titleCase", () => {
  // ✅ Debe poner la primera letra de cada palabra en mayúscula
  test("convierte a mayúscula la primera letra de cada palabra", () => {
    expect(titleCase("juan perez")).toBe("Juan Perez");
  });

  // ✅ Debe eliminar espacios extra y dejar solo uno entre palabras
  test("elimina espacios extra", () => {
    expect(titleCase("   maria   lopez ")).toBe("Maria Lopez");
  });

  // ✅ Si el string está vacío, debe devolver un string vacío
  test("devuelve vacío si se pasa vacío", () => {
    expect(titleCase("")).toBe("");
  });
});
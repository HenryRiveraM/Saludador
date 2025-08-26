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

// -----------------------------
// PRUEBAS PARA getHourGreeting
// -----------------------------
describe("getHourGreeting", () => {
  // ✅ En español, antes de las 12 debe devolver 'Buenos días'
  test("devuelve 'Buenos días' en español antes de las 12", () => {
    mockDate("09");
    expect(getHourGreeting("es")).toBe("Buenos días");
  });

  // ✅ En español, entre 12 y 19 debe devolver 'Buenas tardes'
  test("devuelve 'Buenas tardes' en español entre 12 y 19", () => {
    mockDate("15");
    expect(getHourGreeting("es")).toBe("Buenas tardes");
  });

  // ✅ En inglés, después de las 19 debe devolver 'Good evening'
  test("devuelve 'Good evening' en inglés después de 19", () => {
    mockDate("21");
    expect(getHourGreeting("en")).toBe("Good evening");
  });
});


// -----------------------------
// PRUEBAS PARA getCourtesy
// -----------------------------
describe("getCourtesy", () => {
  // ✅ En español, con género "H" debe devolver "Sr."
  test("retorna 'Sr.' para hombres en español", () => {
    expect(getCourtesy("es", "H", 25)).toBe("Sr.");
  });

  // ✅ En español, con género "M" debe devolver "Sra."
  test("retorna 'Sra.' para mujeres en español", () => {
    expect(getCourtesy("es", "M", 20)).toBe("Sra.");
  });

  // ✅ En inglés, sin género pero con edad > 30 debe devolver "Mr./Ms."
  test("retorna 'Mr./Ms.' si no hay género pero edad > 30 en inglés", () => {
    expect(getCourtesy("en", "", 40)).toBe("Mr./Ms.");
  });

  // ✅ En español, sin género y edad joven debe devolver vacío
  test("retorna vacío si es joven sin género", () => {
    expect(getCourtesy("es", "", 20)).toBe("");
  });
});
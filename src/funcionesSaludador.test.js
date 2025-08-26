const { titleCase, getHourGreeting, getCourtesy, buildGreeting } = require("./funcionesSaludador");


const mockDate = (hour) => {
  const RealDate = Date;
  global.Date = class extends RealDate {
    constructor() {
      return new RealDate(`2020-01-01T${hour}:00:00`);
    }
  };
};


// PRUEBAS PARA titleCase

describe("titleCase", () => {
  
  test("convierte a mayúscula la primera letra de cada palabra", () => {
    expect(titleCase("juan perez")).toBe("Juan Perez");
  });

  
  test("elimina espacios extra", () => {
    expect(titleCase("   maria   lopez ")).toBe("Maria Lopez");
  });

  
  test("devuelve vacío si se pasa vacío", () => {
    expect(titleCase("")).toBe("");
  });
});


// PRUEBAS PARA getHourGreeting

describe("getHourGreeting", () => {
  test("devuelve 'Buenos días' en español antes de las 12", () => {
    mockDate("09");
    expect(getHourGreeting("es")).toBe("Buenos días");
  });


  test("devuelve 'Buenas tardes' en español entre 12 y 19", () => {
    mockDate("15");
    expect(getHourGreeting("es")).toBe("Buenas tardes");
  });


  test("devuelve 'Good evening' en inglés después de 19", () => {
    mockDate("21");
    expect(getHourGreeting("en")).toBe("Good evening");
  });
});



// PRUEBAS PARA getCourtesy

describe("getCourtesy", () => {

  test("retorna 'Sr.' para hombres en español", () => {
    expect(getCourtesy("es", "H", 25)).toBe("Sr.");
  });


  test("retorna 'Sra.' para mujeres en español", () => {
    expect(getCourtesy("es", "M", 20)).toBe("Sra.");
  });


  test("retorna 'Mr./Ms.' si no hay género pero edad > 30 en inglés", () => {
    expect(getCourtesy("en", "", 40)).toBe("Mr./Ms.");
  });


  test("retorna vacío si es joven sin género", () => {
    expect(getCourtesy("es", "", 20)).toBe("");
  });
});

// PRUEBAS PARA buildGreeting

describe("buildGreeting", () => {

  test("construye saludo completo en español con género", () => {
    mockDate("10");
    const result = buildGreeting({ nombre: "carlos", edad: 40, genero: "H", lang: "es" });
    expect(result).toBe("Buenos días, Sr. Carlos");
  });


  test("usa 'visitante' si no hay nombre en español", () => {
    mockDate("18");
    const result = buildGreeting({ nombre: "", edad: 20, genero: "", lang: "es" });
    expect(result).toBe("Buenas tardes, Visitante");
  });


  test("usa 'guest' si no hay nombre en inglés", () => {
    mockDate("22");
    const result = buildGreeting({ nombre: "", edad: 25, genero: "", lang: "en" });
    expect(result).toBe("Good evening, Guest");
  });
});
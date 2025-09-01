cosas que quiero hacer: 

aprender a usar el redux mas moderno:
    con rtk query, redux toolkit, 
Middlewares para lógica asíncrona
Redux en su forma pura no sabe manejar asincronía, así que se usan middlewares.

1. redux-thunk (incluido en RTK)
Ejecuta funciones (thunks) que pueden despachar acciones después de resolver promesas.

Ejemplo:

ts
Copiar
Editar
const fetchUser = () => async (dispatch) => {
  const res = await fetch('/user');
  dispatch(setUser(await res.json()));
};
2. redux-saga
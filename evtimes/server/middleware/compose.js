import { NextResponse } from "next/server";

export const compose = (middlewares, handler) => {
  return async (req) => {
    const context = {}; 

    let index = -1;

    const dispatch = async (i) => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;

      const fn = middlewares[i] || handler;
      if (!fn) return;

      return await fn(req, context, () => dispatch(i + 1));
    };

    try {
      return await dispatch(0);
    } catch (err) {
      return NextResponse.json(
        { message: err.message },
        { status: 500 }
      );
    }
  };
};
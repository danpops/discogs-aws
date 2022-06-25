function asyncPipe (...fns: any) {
  return async (init: any) => {
    return fns.reduce(async (val: any, fn: any) => fn(await val), init)
  }
}

export { asyncPipe }

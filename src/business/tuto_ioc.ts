//IOC --> inversion of control

class Leo {
  dateOfLegDay: Date;
  counter = 0
  constructor(time: string, private attempt: number) {
    this.dateOfLegDay = new Date(time)
  }
  talk() {
    if (this.counter < this.attempt) {
      this.counter++
      return 'I am Leo and the leg day is at ' + this.dateOfLegDay.toDateString();
    }

    return 'I am Leo and I am tired'
  }
}

class Mathilde {
  leo: Leo;

  constructor(leo: Leo) {
    this.leo = leo
  }

  taGueule() {
    console.log('ta gueule', this.leo.talk());
  }
}

class Stephane {
  leo: Leo;
  mathilde: Mathilde;

  constructor(leo: Leo, mathilde: Mathilde) {
    this.leo = leo
    this.mathilde = mathilde
  }

  fuckYou() {
    console.log('j\'vous baise ', this.leo.talk(), ' ', this.mathilde.taGueule());
  }
}

const leo = new Leo('7:00', 2);

const mathilde = new Mathilde(leo);

const stephane = new Stephane(leo, mathilde)

stephane.fuckYou()

//DI --> dependency injection

class Container {
  private _definitions: { [key: string]: () => any }

  private static instance: Container;

  public static get Instance(): Container {
    if (!this.instance) {
      this.instance = new Container()
    }

    return this.instance
  }

  constructor() {
    this._definitions = {}
  }
  register(name: string, builder: () => any) {
    this._definitions[name] = builder
  }
  resolve(name: string): any {
    const builder = this._definitions[name]
    const instance = builder()
    return instance
  }
}
const container = Container.Instance

container.register('leo', () => new Leo('7:00', 2))
container.register('mathilde', () => new Mathilde(container.resolve('leo')))
container.register('stephane', () => new Stephane(
  container.resolve('leo'),
  container.resolve('mathilde')
))

// const stephaneInstance = container.resolve('stephane')
const uneMathilde = container.resolve('mathilde')

class BDDConnection {
  private _nbRequestInprogress: number
  private _limitPool: number

  private static instance: BDDConnection

  public static get Instance(): BDDConnection {
    if (!this.instance) {
      this.instance = new BDDConnection()
    }

    return this.instance
  }

  constructor() {
    this._limitPool = 10
    this._nbRequestInprogress = 0
  }

  open(login: string, password: string) {
    if (this._nbRequestInprogress >= this._limitPool) {
      throw new Error('too many request')
    }

    this._nbRequestInprogress++
    return 'connection opened'
  }
}

// bootstrap file

const server = {
  container: {} as Container
}

server.container = Container.Instance

server.container.register('leo', () => new Leo('7:00', 2))
server.container.register('mathilde', () => new Mathilde(server.container.resolve('leo')))
server.container.register('stephane', () => new Stephane(
  server.container.resolve('leo'),
  server.container.resolve('mathilde')
))

// fichier v1

const connection1 = BDDConnection.Instance.open('login', 'password')
const mathilde1 = Container.Instance.resolve('mathilde')

// fichier v2 

const connection2 = BDDConnection.Instance.open('login', 'password')
const leo1 = Container.Instance.resolve('leo')

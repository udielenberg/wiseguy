import { render, cleanup, act, fireEvent } from '@testing-library/react'

const globalAny: any = global;

globalAny.render = render;
globalAny.cleanup = cleanup;
globalAny.fireEvent = fireEvent;
globalAny.act = act;

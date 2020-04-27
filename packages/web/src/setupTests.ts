import { render, cleanup, act, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";


const globalAny: any = global;

globalAny.render = render;
globalAny.cleanup = cleanup;
globalAny.fireEvent = fireEvent;
globalAny.act = act;

import React from "react";
import { render, cleanup, act, fireEvent } from '@testing-library/react'
const globalAny: any = global;

globalAny.React = React;
globalAny.render = render;
globalAny.cleanup = cleanup;
globalAny.fireEvent = fireEvent;
globalAny.act = act;

import {
  applyDecorators,
  DynamicModule,
  Injectable,
  Provider,
  Type,
} from '@nestjs/common';
import { CommandHandler, EventsHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

const applicationProviders: Provider[] = [];

const registerProvider = (target: Type) => applicationProviders.push(target);

export const RegisterCommandHandler = (Command: Type) =>
  applyDecorators(CommandHandler(Command), registerProvider);
export const RegisterQueryHandler = (Query: Type) =>
  applyDecorators(QueryHandler(Query), registerProvider);
export const RegisterEventsHandler = (Event: Type) =>
  applyDecorators(EventsHandler(Event), registerProvider);
export const RegisterApplicationProvider = () =>
  applyDecorators(Injectable, registerProvider);

export class ConfigureApplication {
  static configureImports(): (Type | DynamicModule)[] {
    return [
      JwtModule.register({}),
    ];
  }

  static configureProviders(): Provider[] {
    return [...applicationProviders];
  }
}

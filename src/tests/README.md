# Estrutura de Testes - Conecta Caparaó

Este diretório contém todos os testes do projeto, organizados seguindo a mesma estrutura do diretório `src/`.

## Organização

```
src/tests/
├── services/           # Testes dos serviços de negócio
├── repositories/       # Testes dos repositórios (futuro)
├── controllers/        # Testes dos controllers (futuro)
├── utils/             # Testes das funções utilitárias (futuro)
├── helpers/           # Utilitários e mocks para testes
│   ├── testUtils.ts   # Funções auxiliares para testes
│   └── mockData.ts    # Dados mock padronizados
└── setup.ts           # Configuração global de testes
```

## Padrão AAA (Arrange, Act, Assert)

Todos os testes seguem o padrão AAA para maior clareza e consistência:

```typescript
describe("NomeDoService", () => {
  it("deve fazer alguma ação específica", async () => {
    // Arrange - Preparar dados e configurações de teste
    const dadosDeEntrada = { /* ... */ };
    repositoryMock.metodo.mockResolvedValue(resultadoMock);

    // Act - Executar a ação que está sendo testada
    const resultado = await service.metodo(dadosDeEntrada);

    // Assert - Verificar se o resultado está correto
    expect(repositoryMock.metodo).toHaveBeenCalledWith(dadosDeEntrada);
    expect(resultado).toEqual(resultadoEsperado);
  });
});
```

## Convenções de Nomenclatura

### Arquivos de Teste
- **Services**: `nomeDoService.spec.ts`
- **Repositories**: `nomeDoRepository.spec.ts`
- **Controllers**: `nomeDoController.spec.ts`
- **Utils**: `nomeDaUtil.spec.ts`

### Estrutura de Describes
```typescript
describe("NomeDoService", () => {
  describe("nomeDoMetodo", () => {
    it("deve realizar ação em caso de sucesso", () => {});
    it("deve lançar erro quando dados inválidos", () => {});
    it("deve retornar null quando não encontrado", () => {});
  });
  
  describe("casos de erro", () => {
    it("deve propagar erro quando repositório falha", () => {});
  });
});
```

### Nomes de Testes
- Use **português** para descrições de testes
- Inicie com **"deve"** seguido da ação esperada
- Seja específico sobre o cenário testado

## Helpers Disponíveis

### testUtils.ts
- `createRepositoryMock<T>()`: Cria mocks padronizados de repositórios
- `createTestData<T>()`: Merge dados de teste com valores padrão
- `createTestDate(offset)`: Gera datas determinísticas para testes
- `clearAllMocks()`: Limpa todos os mocks
- `validateAAAPattern`: Helpers para comentários AAA

### mockData.ts
- Dados mock padronizados para todas as entidades
- `mockCategoria`, `mockMunicipio`, `mockAtracaoTuristica`, etc.
- Datas consistentes usando `createTestDate()`

## Tipos de Testes

### 1. Testes de Sucesso
Testam o comportamento esperado em condições normais:
```typescript
it("deve retornar todas as categorias", async () => {
  // Teste do caso de sucesso principal
});
```

### 2. Testes de Casos Extremos
Testam cenários limítrofes:
```typescript
it("deve retornar array vazio quando não há dados", async () => {
  // Teste de caso extremo
});
```

### 3. Testes de Erro
Testam comportamento em situações de erro:
```typescript
it("deve lançar erro quando email já existe", async () => {
  // Teste de validação de regras de negócio
});

it("deve propagar erro quando repositório falha", async () => {
  // Teste de propagação de erros
});
```

### 4. Testes de Validação
Testam validações específicas de entrada:
```typescript
it("deve retornar null quando ID não existe", async () => {
  // Teste de validação de entrada
});
```

## Executando Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage

# Executar testes de um arquivo específico
npm test nomeDoArquivo.spec.ts
```

## Boas Práticas

1. **Isolamento**: Cada teste deve ser independente
2. **Clareza**: Use nomes descritivos e comentários AAA
3. **Cobertura**: Teste casos de sucesso, erro e extremos
4. **Mocks**: Use mocks consistentes dos helpers
5. **Performance**: Evite operações demoradas em testes unitários
6. **Legibilidade**: Prefira múltiplos asserts específicos a um assert complexo

## Serviços Testados

- ✅ `atracaoTuristicaService`
- ✅ `categoriaService`
- ✅ `contatoService`
- ✅ `dashboardService`
- ✅ `enderecoService`
- ✅ `eventoService`
- ✅ `fotoService`
- ✅ `horarioFuncionamentoService`
- ✅ `municipioService`
- ✅ `noticiaService`
- ✅ `perfilClienteService`
- ✅ `servicoTuristicoService`
- ✅ `subCategoriaService`
- ✅ `usuarioService`

## Próximos Passos

- [ ] Adicionar testes de repositórios
- [ ] Adicionar testes de controllers
- [ ] Adicionar testes de utils
- [ ] Implementar testes de integração
- [ ] Configurar cobertura de código
- [ ] Adicionar testes E2E (se necessário)

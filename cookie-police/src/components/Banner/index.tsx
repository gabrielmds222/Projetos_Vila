import { useState } from "react";
import { Alert, Button, Stack, Text } from "@chakra-ui/react";

function Banner() {
  const [showBanner, setShowBanner] = useState(true);

  const handleAcceptCookies = () => {
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <Alert
          status="info"
          bg="gray.100"
          position="fixed"
          bottom={0}
          left={0}
          width="100%"
          p={4}
        >
          <Stack direction="column" spacing={2}>
            <Text>
              Nós usamos cookies em nosso site. Os cookies são utilizados para
              disponibilizar as funcionalidades e o uso do nosso site, além de
              contribuir para nossas análises e melhorar a usabilidade. Ao
              aceitar e continuar a usar este site, você concorda com o uso dos
              cookies.
            </Text>
            <Stack direction="row" justify="space-between" align="center">
              <Stack direction="column">
                <Text>Ler política de cookies</Text>
                <Button
                  ml={4}
                  variant="outline"
                  size="md"
                  fontSize="14px"
                  bg="#868685"
                  color="#fff"
                  onClick={() =>
                    (window.location.href =
                      "https://www.gov.br/anpd/pt-br/documentos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf")
                  }
                >
                  Detalhes
                </Button>
              </Stack>
              <Stack direction="row">
                <Button
                  ml={4}
                  variant="outline"
                  size="md"
                  fontSize="14px"
                  bg="#868685"
                  color="#fff"
                  onClick={handleAcceptCookies}
                >
                  Rejeitar e continuar
                </Button>
                <Button
                  ml={4}
                  variant="outline"
                  size="md"
                  fontSize="14px"
                  bg="#868685"
                  color="#fff"
                  onClick={handleAcceptCookies}
                >
                  Aceitar e continuar
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Alert>
      )}
    </>
  );
}

export default Banner;

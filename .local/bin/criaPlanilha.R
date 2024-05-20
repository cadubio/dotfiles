#!/usr/bin/env r

ucs_fed_com_contexto <-
    readr::read_delim("buscaTermosComContexto.txt",
                  delim = "#",
                  col_names = FALSE,
                  show_col_types = FALSE
                  ) |>
  dplyr::mutate(
    contexto = stringi::stri_trans_general(stringr::str_squish(X3),
    "latin-ascii")
    ) |>
  dplyr::mutate(
                pasta = stringr::str_extract(X1, "(?<=\\.\\/)(.*?)(?=\\/)"),
                uc = stringr::str_split_i(X1, "/", 3),
                arquivo = stringr::str_extract(X1, "([^\\/]+)$"),
                pagina = X2
  ) |>
  dplyr::select(uc, arquivo, pagina, contexto)

ucs_fed_sem_contexto <-
  readr::read_delim("buscaTermosSemContexto.txt",
                    delim = "#",
                    col_names = FALSE,
                    show_col_types = FALSE
                    ) |>
  dplyr::mutate(
                pasta = stringr::str_extract(X1, "(?<=\\.\\/)(.*?)(?=\\/)"),
                uc = stringr::str_split_i(X1, "/", 3),
                arquivo = stringr::str_extract(X1, "([^\\/]+)$"),
                pagina = X2,
                termo = X3
  ) |>
  dplyr::select(uc, arquivo, pagina, termo)

ucs_federais <-
  dplyr::full_join(
    ucs_fed_sem_contexto,
    ucs_fed_com_contexto
  ) |>
writexl::write_xlsx("termos_buscados.xlsx")

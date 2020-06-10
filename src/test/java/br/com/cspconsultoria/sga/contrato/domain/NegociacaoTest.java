package br.com.cspconsultoria.sga.contrato.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.cspconsultoria.sga.contrato.web.rest.TestUtil;

public class NegociacaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Negociacao.class);
        Negociacao negociacao1 = new Negociacao();
        negociacao1.setId(1L);
        Negociacao negociacao2 = new Negociacao();
        negociacao2.setId(negociacao1.getId());
        assertThat(negociacao1).isEqualTo(negociacao2);
        negociacao2.setId(2L);
        assertThat(negociacao1).isNotEqualTo(negociacao2);
        negociacao1.setId(null);
        assertThat(negociacao1).isNotEqualTo(negociacao2);
    }
}

package br.com.cspconsultoria.sga.contrato.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.cspconsultoria.sga.contrato.web.rest.TestUtil;

public class UnidadeComercialTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnidadeComercial.class);
        UnidadeComercial unidadeComercial1 = new UnidadeComercial();
        unidadeComercial1.setId(1L);
        UnidadeComercial unidadeComercial2 = new UnidadeComercial();
        unidadeComercial2.setId(unidadeComercial1.getId());
        assertThat(unidadeComercial1).isEqualTo(unidadeComercial2);
        unidadeComercial2.setId(2L);
        assertThat(unidadeComercial1).isNotEqualTo(unidadeComercial2);
        unidadeComercial1.setId(null);
        assertThat(unidadeComercial1).isNotEqualTo(unidadeComercial2);
    }
}

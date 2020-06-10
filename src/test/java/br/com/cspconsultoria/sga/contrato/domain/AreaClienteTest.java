package br.com.cspconsultoria.sga.contrato.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.cspconsultoria.sga.contrato.web.rest.TestUtil;

public class AreaClienteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AreaCliente.class);
        AreaCliente areaCliente1 = new AreaCliente();
        areaCliente1.setId(1L);
        AreaCliente areaCliente2 = new AreaCliente();
        areaCliente2.setId(areaCliente1.getId());
        assertThat(areaCliente1).isEqualTo(areaCliente2);
        areaCliente2.setId(2L);
        assertThat(areaCliente1).isNotEqualTo(areaCliente2);
        areaCliente1.setId(null);
        assertThat(areaCliente1).isNotEqualTo(areaCliente2);
    }
}

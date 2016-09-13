$(function(){

	/* Máscara no CEP */
	$("[name='cep']").mask("99999-999");

	$(".alert").hide();

	/*	Desabilitando os campos */
	$("[name='rua'], [name='bairro'], [name='cidade'], [name='estado']").attr('disabled', true);
	
	/* Quando o campo CEP perder o foco */
	$("[name='cep']").blur(function(){

		cep = $(this).val();

		/* Valor loading enquanto consulta o site dos correios */
		$("[name='rua'], [name='bairro'], [name='cidade'], [name='estado']").val('Loading ..');

		/* Após o campo CEP perder o foco, chamamos a função localizar_cep em 1 segundo*/
		setInterval(localizar_cep, 1000);


		function localizar_cep(){
			/* Realiza a busca no webservice dos correios */
			$.getJSON("http://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

				
				/* Aqui Preenchemos os inputs com dados da busca*/
				$("[name='rua']").val(dados.logradouro);
				$("[name='bairro']").val(dados.bairro);
				$("[name='cidade']").val(dados.localidade);
				$("[name='estado']").val(dados.uf);
			});
			setInterval(function(){
				if($("[name='rua']").val() == ""){
					$(".alert").addClass('alert-danger').removeClass('alert-info').fadeIn('slow').html("<strong>Erro!</strong> CEP informado errado.");
				} else {
					/*	Exibimos o aviso que tudo ocorreu bem */
					$(".alert").addClass('alert-info').removeClass('alert-danger').fadeIn('slow').html("<strong>Parabéns!</strong> Você localizou um endereço.");

				}
			},1000)

		}




	});





});
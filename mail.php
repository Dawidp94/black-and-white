<?php
if ($_POST)
{
	////////// USTAWIENIA //////////
	$email = 'dawidpawlata_1994@o2.pl';	// Adres e-mail adresata
	$subject = 'Formularz';	// Temat listu
	$message = 'Dziękujemy za wysłanie formularza';	// Komunikat
	$error = 'Wystąpił błąd podczas wysyłania formularza';	// Komunikat błędu
	$charset = 'utf-8';	// Strona kodowa
	//////////////////////////////
	
	if (!isset($_POST['captcha']) || $_POST['captcha'] != '') echo $error;
	else
	{
		unset($_POST['captcha']);
		$head =
			"MIME-Version: 1.0\r\n" .
			"Content-Type: text/plain; charset=$charset\r\n" .
			"Content-Transfer-Encoding: 8bit";
		$body = '';
		foreach ($_POST as $name => $value)
		{
			if (is_array($value))
			{
				for ($i = 0; $i < count($value); $i++)
				{
					$body .= "$name=" . (get_magic_quotes_gpc() ? stripslashes($value[$i]) : $value[$i]) . "\r\n";
				}
			}
			else $body .= "$name=" . (get_magic_quotes_gpc() ? stripslashes($value) : $value) . "\r\n";
		}
		echo mail($email, "=?$charset?B?" . base64_encode($subject) . "?=", $body, $head) ? $message : $error;
	}
}
else
{
?>
<form action="mailto:dawidpawlata_1994@o2.pl" method="post">

                        <div class="contact-feedback-element">
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Your name...">
                        </div>

                        <div class="contact-feedback-element">
                            <label for="e-mail">E-mail</label>
                            <input type="text" name="e-mail" id="e-mail" placeholder="Your e-mail...">
                        </div>

                        <div class="contact-feedback-element">
                            <label for="phone">Phone</label>
                            <input type="number" name="phone" id="phone" placeholder="Your phone number...">
                        </div>

                        <div class="contact-feedback-element-last">
                        <label for="message">Message</label>
                            <textarea placeholder="Text your message..." name="message" id="message"></textarea>
                        </div>
                        <div class="contact-feedback-button">
                            <input type="submit" value="SEND MESSAGE">

<input name="captcha" style="display: none">
</form>
<?php
}
?>
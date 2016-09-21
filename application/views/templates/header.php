<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title><?= (isset($page_title)) ? $page_title : 'Your Default Page Title'; ?></title>
	<meta name="description" content="<?= (isset($meta_description)) ? $meta_description : 'Your Default Meta Desciption' ; ?>" />
	<meta name="viewport" content="width=device-width">

	<?php if (!empty($site_css)) : ?>
		<?php foreach ($site_css as $css) : ?>
			<link rel="stylesheet" type="text/css" href="<?=base_url() . $css;?>" />
		<?php endforeach; ?>
	<?php endif; ?>

	<?php if (!empty($site_js)) : ?>
		<?php foreach ($site_js as $js) : ?>
		    <script type="text/javascript" src="<?=base_url() . $js;?>"></script>
		<?php endforeach; ?>
	<?php endif; ?>

    <?php // RequireJS to handle js dependencies and client-side scripting ?>
    
    <link rel="icon" href="favicon.ico">
</head>

<body>
<!--[if lt IE 7]>
	<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
<![endif]-->
<p>
Router: $state = {{$state.current.name}}
</p>
<div ui-view></div>
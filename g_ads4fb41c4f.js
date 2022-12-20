/*
  Easily add your flexible AdSense ads to your page.
  
  Use This Script:
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="//cdn.jsdelivr.net/gh/poifn/cdn/g_ads4fb41c4f.js"></script>
  
  Example Usage:
    <div class="google-ads" data-client-id="ca-pub-3188959633775259" data-ad-id="3261049626"></div>
*/

$(function(){$(".google-ads").each((a,d)=>{$(d).html('<ins class="adsbygoogle" style="display:block;background-color:#C5C5C5" data-ad-client="'+$(d).data("client-id")+'" data-ad-slot="'+$(d).data("ad-id")+'" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script>')})});

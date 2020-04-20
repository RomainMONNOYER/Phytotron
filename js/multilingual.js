
//Define language reload anchors
var dataReload = document.querySelectorAll("[data-reload]");

//Language translations

//Define language via window hash
if (window.location.hash)
{
    if (window.location.hash == "#eng") {
        hi.textContent = language.eng.welcome;
        currentLanguage.textContent="English";
    }else if (window.location.hash == "#fr") {
        hi.textContent = language.fr.welcome;
        currentLanguage.textContent="Français";
    }else if (window.location.hash == "#es") {
        hi.textContent = language.es.welcome;
        currentLanguage.textContent="Española";
    }
}

//Define language reload onclick illiteration
for (i = 0; i < dataReload.length; i++)
{
    dataReload[i].onclick = function()
    {
        window.location.href=this.getAttribute("href");
        window.location.reload(true);
    };
}
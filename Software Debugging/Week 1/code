def remove_html_markup(s):
    tag_mode = False
    quote_mode = False
    out = ""

    for c in s:
        if c == '<' and not quote_mode:
            tag_mode = True
        elif c == '>' and not quote_mode:
            tag_mode = False
        elif (c == '"' or c == "'") and tag_mode:
            quote_mode = not quote_mode
        elif not tag_mode:
            out = out + c
    return out

print remove_html_markup("asdaindsa<b>asedas</b>")
print remove_html_markup("<a href='>'>testtestg</a>")
print remove_html_markup('<a href=">">testtestg</a>')
print remove_html_markup("<b>foo</a>")
print remove_html_markup('"<b>foo</a>"')
print remove_html_markup("'<b>foo</a>'")
print remove_html_markup('""')
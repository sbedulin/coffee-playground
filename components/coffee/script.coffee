data =
    name : 'Sergey'
    stats: [1, 2, 3]
    links:
        link1: 'link1'
        link2: 'link2'
        link3: 'link3'

a = [1..10]
a[1..2] = [10, 20]
nums = a.join '+'
sum = a.reduce (a, b) -> a + b

name = data.name
$('#content').append "<em>#{data.name}</em>#{nums}=#{sum}" if name?

for key, value of data
    console.log "#{key}: #{value}"

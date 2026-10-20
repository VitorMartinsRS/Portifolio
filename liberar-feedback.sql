
begin;
alter table public.feedbacks enable row level security;
grant insert (nome, comentario) on public.feedbacks to anon;
drop policy if exists "Visitantes podem enviar feedback" on public.feedbacks;
create policy "Visitantes podem enviar feedback"
on public.feedbacks
for insert
to anon
with check (
  char_length(trim(nome)) between 1 and 100
  and char_length(trim(comentario)) between 1 and 2000
);
commit;
